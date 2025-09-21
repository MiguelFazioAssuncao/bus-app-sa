import Preferences from "../models/Preferences.js";
import { getRoute } from "./stationsController.js";

const pointRegex = /^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/;

function fmtDistance(m) {
  return m >= 1000 ? `${(m / 1000).toFixed(2)} km` : `${Math.round(m)} m`;
}
function fmtMinutes(ms) {
  return `${Math.round(ms / 60000)} min`;
}


async function setUserLocation(req, res, type) {
  try {
    const nameField = type === 'home' ? 'homeName' : 'workName';
    const { userId, point1, point2 } = req.body || {};
    const locationName = req.body?.[nameField];
    if (!userId || !locationName || !point1 || !point2) {
      return res.status(400).json({ message: `Os campos 'userId', '${nameField}', 'point1' e 'point2' são obrigatórios.` });
    }
    if (!pointRegex.test(point1) || !pointRegex.test(point2)) {
      return res.status(400).json({ message: "Os pontos devem estar no formato 'lat,lng'." });
    }

    let routeResult;
    const mockReq = { query: { point1, point2 } };
    const mockRes = {
      status: (code) => ({
        json: (data) => {
          routeResult = { code, data };
          return routeResult;
        },
      }),
    };

    await getRoute(mockReq, mockRes);

    const routeData = routeResult?.data;
    if (!routeData || !Array.isArray(routeData.paths) || !routeData.paths.length) {
      return res.status(502).json({ message: "Falha ao obter rota." });
    }

    const best = routeData.paths[0];
    const distanceMeters = Math.round(best.distance);
    const timeMinutes = Math.max(1, Math.round(best.time / 60000));

    try {
      await Preferences.updateLocation(userId, type, locationName, distanceMeters, timeMinutes);
    } catch (dbErr) {
      return res.status(500).json({ message: `Erro ao salvar preferência de ${type}`, error: dbErr.message });
    }

    return res.status(200).json({
      message: `${type === 'home' ? 'Home' : 'Work'} atualizado com sucesso.`,
      [type]: {
        name: locationName,
        point: point1,
        distanceMeters,
        timeMinutes,
        distance: fmtDistance(distanceMeters),
        time: `${timeMinutes} min`,
      },
      routePreview: {
        distance: fmtDistance(best.distance),
        time: fmtMinutes(best.time),
      },
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error", error: err.message });
  }
}

export const setHome = (req, res) => setUserLocation(req, res, 'home');
export const setWork = (req, res) => setUserLocation(req, res, 'work');