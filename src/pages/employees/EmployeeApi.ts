import Employee from "./Employee";

const REST_API_URL='http://localhost:8080/api/';

export async function searchEmployees () {
  let url = REST_API_URL + 'employees';
  let consulta = await fetch(url, {
    "method": 'GET',
    "headers": {
      "Content-Type": 'application/json'
    }
  });
  
  return await consulta.json();
}

export async function removeEmployee (id: string) {
  let url = REST_API_URL + 'employees/' + id;
  await fetch(url, {
    "method": 'DELETE',
    "headers": {
      "Content-Type": 'application/json'
    }
  });
}

export async function saveEmployee (employee: Employee) {
  let url = REST_API_URL + 'employees';
  await fetch(url, {
    "method": 'POST',
    "headers": {
      "Content-Type": 'application/json'
    },
    "body": JSON.stringify(employee)
  });
}

export async function searchEmployeeById (id: string) {
  let url = REST_API_URL + 'employees/' + id;
  let consulta = await fetch(url, {
    "method": 'GET',
    "headers": {
      "Content-Type": 'application/json'
    }
  });
  
  return await consulta.json();
}

