import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import { LeafletMapProps } from '../interfaces/LeafletMapProps';
import { UFLatLang } from '../interfaces/UFLatLang';

export function LeafletMap(props: LeafletMapProps): JSX.Element {
  // Guarda as posições de cada estado (serve somente para os markers).
  const state_position: UFLatLang[] = [
    { uf: 'RS', lat: -29.54479, lang: -53.27271 },
    { uf: 'SC', lat: -27.11781, lang: -50.53711 },
    { uf: 'PR', lat: -24.44715, lang: -51.62476 },
    { uf: 'SP', lat: -22.14671, lang: -48.69141 },
    { uf: 'MG', lat: -18.6046, lang: -44.5166 },
    { uf: 'BA', lat: -12.38293, lang: -41.87988 },
    { uf: 'RJ', lat: -22.57344, lang: -43.04443 },
    { uf: 'ES', lat: -19.70466, lang: -40.64941 },
    { uf: 'MS', lat: -20.38583, lang: -54.7998 },
    { uf: 'GO', lat: -16.15137, lang: -49.54834 },
    { uf: 'DF', lat: -15.8134, lang: -47.8125 },
    { uf: 'MT', lat: -13.41099, lang: -56.44775 },
    { uf: 'RO', lat: -11.0706, lang: -63.39111 },
    { uf: 'AC', lat: -8.84165, lang: -70.40039 },
    { uf: 'AM', lat: -3.86425, lang: -63.98438 },
    { uf: 'PA', lat: -5.00339, lang: -53.08594 },
    { uf: 'TO', lat: -10.25006, lang: -48.142 },
    { uf: 'MA', lat: -5.3754, lang: -45.35156 },
    { uf: 'PI', lat: -7.51498, lang: -42.20947 },
    { uf: 'CE', lat: -5.20036, lang: -39.59473 },
    { uf: 'RN', lat: -5.81276, lang: -36.60645 },
    { uf: 'PB', lat: -7.27529, lang: -36.40869 },
    { uf: 'PE', lat: -8.53757, lang: -37.63916 },
    { uf: 'AL', lat: -9.75237, lang: -36.40869 },
    { uf: 'SE', lat: -10.6822, lang: -37.26563 },
    { uf: 'RR', lat: 1.49397, lang: -60.95215 },
    { uf: 'AP', lat: 0.90084, lang: -51.74561 },
  ];

  // Filtra a lista por um UF específico.
  function findUFLatLang(uf: string): UFLatLang {
    return state_position.filter((value) => value.uf == uf)[0];
  }

  return (
    <>
      <h1 style={{ margin: '2em 0 0.5em 0' }}>🧭 Distribuição Geográfica dos pacientes</h1>
      <p>Os estados que não possuem pacientes não são mostrados.</p>
      <MapContainer
        style={{
          height: '30em',
          width: '100%',
          position: 'relative',
          border: '1px solid #4b2e73',
          boxShadow: '7px 8px 5px #00000017',
        }}
        center={[-16.15137, -49.54834]}
        zoom={4}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {props.ufs.map((uf, index) => {
          const latlang = findUFLatLang(uf);
          return uf in props.map ? (
            <Marker key={index} position={[latlang.lat, latlang.lang]}>
              <Tooltip direction="bottom" offset={[-15, 20]} opacity={1} permanent>
                {uf}: {props.map[uf]} pacientes.
              </Tooltip>
            </Marker>
          ) : (
            <div key={index}></div>
          );
        })}
      </MapContainer>
    </>
  );
}
