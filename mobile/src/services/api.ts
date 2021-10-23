import axios from 'axios';

export const api = axios.create({
  baseURL: '', // aqui colocar o ip da sua maquina
});