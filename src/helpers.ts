import { constants } from "constants";
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const setAuthToken = () => {
  const token = localStorage.getItem(constants.AUTH_TOKEN_KEY);
  api.defaults.headers['Authorization'] = token ? `Bearer ${JSON.parse(token)}` : "";
};

setAuthToken()

export const getLocalTimezoneInfo = () => {
  const date = new Date();

  // Get the local timezone name
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Get the timezone offset in minutes and convert it to HH:mm format
  const offsetMinutes = date.getTimezoneOffset();
  const offsetHours = Math.abs(Math.floor(offsetMinutes / 60));
  const offsetMins = Math.abs(offsetMinutes % 60);
  const sign = offsetMinutes > 0 ? '-' : '+';
  const offset = `${sign}${String(offsetHours).padStart(2, '0')}:${String(offsetMins).padStart(2, '0')}`;

  return { timeZone, offset };
};

export const dateViewFormatter = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

export const timeViewFormatter = new Intl.DateTimeFormat('en-GB', {
  hour12: true,
  hour: '2-digit',
  minute: '2-digit'
})

export const getDateInYYYYMMDD = (date: Date) => {
  return `${date.getFullYear().toString().padStart(2, "0")}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`
}