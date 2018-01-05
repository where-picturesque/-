import request from '../utils/request';

export function get({ page }) {
	console.log("get")
  return request(`/api/users?_page=${page}&_limit=3`);
}