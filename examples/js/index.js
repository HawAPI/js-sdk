// Create client with local endpoint
const client = HawAPI.createClient({ endpoint: 'http://localhost:8080/api' });

const requestText = document.querySelector('#request');
const modelSelect = document.querySelector('#models');
const itemSelect = document.querySelector('#items');
const pingElement = document.querySelector('#ping');
const codeElement = document.querySelector('#code');

/**
 * Get all items from model
 */
async function getAll() {
  codeElement.innerHTML = 'Loading...';

  const res = await client.getAll(modelSelect.value);

  requestText.innerHTML = `GET /api/v1/${modelSelect.value}`;
  codeElement.innerHTML = JSON.stringify(res, null, 2);

  // Clear select
  itemSelect.innerHTML =
    '<option disabled selected value="select">Select model</option>';

  // Rebuild all select
  for (var i = 0; i < res.data.length; i++) {
    const option = document.createElement('option');
    const data = res.data[i];

    const ref = data.title || data.name || data.first_name;
    option.value = data.uuid;
    option.text = data.uuid + ` (${ref})`;
    itemSelect.appendChild(option);
  }
}

/**
 * Get single item from model
 */
async function getSingle() {
  codeElement.innerHTML = 'Loading...';

  const res = await client.getBy(modelSelect.value, itemSelect.value);

  requestText.innerHTML = `GET /api/v1/${modelSelect.value}/${itemSelect.value}`;
  codeElement.innerHTML = JSON.stringify(res, null, 2);
}

window.onload = async () => {
  const ping = await client.ping();
  pingElement.innerHTML = ping;

  modelSelect.addEventListener('change', () => getAll());
  itemSelect.addEventListener('change', () => getSingle());
};
