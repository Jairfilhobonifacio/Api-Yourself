import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cria o diretório público se não existir
const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// URLs dos assets do Leaflet
const assets = [
  {
    url: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x.png',
    filename: 'marker-icon-2x.png'
  },
  {
    url: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png',
    filename: 'marker-shadow.png'
  },
  {
    url: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon.png',
    filename: 'marker-icon.png'
  }
];

// Função para baixar um arquivo
function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Download concluído: ${filepath}`);
        resolve(true);
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Remove o arquivo em caso de erro
      reject(err);
    });
  });
}

// Baixa todos os assets
async function downloadAllAssets() {
  console.log('Iniciando download dos assets do Leaflet...');
  
  try {
    for (const asset of assets) {
      const filepath = path.join(publicDir, asset.filename);
      await downloadFile(asset.url, filepath);
    }
    console.log('Todos os assets foram baixados com sucesso!');
  } catch (error) {
    console.error('Erro ao baixar os assets:', error);
    process.exit(1);
  }
}

// Executa o download
downloadAllAssets();
