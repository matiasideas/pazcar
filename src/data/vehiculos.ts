import ram1500Image1 from '@/assets/ram-1500.webp';
import ram1500Image2 from '@/assets/ram-1500-2.webp';
import ram1500Image3 from '@/assets/ram-1500-3.webp';
import ram1500Image4 from '@/assets/ram-1500-4.webp';
import ram1500Image5 from '@/assets/ram-1500-5.webp';
import ram1500Image6 from '@/assets/ram-1500-6.webp';
import ram1500Image7 from '@/assets/ram-1500-7.webp';
import ram1500Image8 from '@/assets/ram-1500-8.webp';
import ram1500Image9 from '@/assets/ram-1500-9.webp';
import ram1500Image10 from '@/assets/ram-1500-10.webp';
import ram1500Image11 from '@/assets/ram-1500-11.webp';
import nissanKicks1 from '@/assets/nissan-kicks-1.webp';
import nissanKicks2 from '@/assets/nissan-kicks-2.webp';
import nissanKicks3 from '@/assets/nissan-kicks-3.webp';
import nissanKicks4 from '@/assets/nissan-kicks-4.webp';
import nissanKicks5 from '@/assets/nissan-kicks-5.webp';
import nissanKicks6 from '@/assets/nissan-kicks-6.webp';
import nissanKicks7 from '@/assets/nissan-kicks-7.webp';
import nissanKicks8 from '@/assets/nissan-kicks-8.webp';
import nissanKicks9 from '@/assets/nissan-kicks-9.webp';
import nissanKicks10 from '@/assets/nissan-kicks-10.webp';
import nissanKicks11 from '@/assets/nissan-kicks-11.webp';
import nissanKicks12 from '@/assets/nissan-kicks-12.webp';
import nissanKicks13 from '@/assets/nissan-kicks-13.webp';
import nissanKicks14 from '@/assets/nissan-kicks-14.webp';
import nissanKicks15 from '@/assets/nissan-kicks-15.webp';
import nissanKicks16 from '@/assets/nissan-kicks-16.webp';
import nissanKicks17 from '@/assets/nissan-kicks-17.webp';
import nissanKicks18 from '@/assets/nissan-kicks-18.webp';
import nissanKicks19 from '@/assets/nissan-kicks-19.webp';
import fordRaptor1 from '@/assets/ford-raptor-1.webp';
import fordRaptor2 from '@/assets/ford-raptor-2.webp';
import fordRaptor3 from '@/assets/ford-raptor-3.webp';
import fordRaptor4 from '@/assets/ford-raptor-4.webp';
import fordRaptor5 from '@/assets/ford-raptor-5.webp';
import fordRaptor6 from '@/assets/ford-raptor-6.webp';
import fordRaptor7 from '@/assets/ford-raptor-7.webp';
import fordRaptor8 from '@/assets/ford-raptor-8.webp';
import fordRaptor9 from '@/assets/ford-raptor-9.webp';
import fordRaptor10 from '@/assets/ford-raptor-10.webp';
import fordRaptor11 from '@/assets/ford-raptor-11.webp';
import fordRaptor12 from '@/assets/ford-raptor-12.webp';
import fordRaptor13 from '@/assets/ford-raptor-13.webp';
import fordRaptor14 from '@/assets/ford-raptor-14.webp';
import fordRaptor15 from '@/assets/ford-raptor-15.webp';
import fordRaptor16 from '@/assets/ford-raptor-16.webp';
import fordRaptor17 from '@/assets/ford-raptor-17.webp';
import fordRaptor18 from '@/assets/ford-raptor-18.webp';
import fordRaptor19 from '@/assets/ford-raptor-19.webp';
import fordRaptor20 from '@/assets/ford-raptor-20.webp';
import renaultKwid1 from '@/assets/renault-kwid-1.webp';
import renaultKwid2 from '@/assets/renault-kwid-2.webp';
import renaultKwid3 from '@/assets/renault-kwid-3.webp';
import renaultKwid4 from '@/assets/renault-kwid-4.webp';
import renaultKwid5 from '@/assets/renault-kwid-5.webp';
import renaultKwid6 from '@/assets/renault-kwid-6.webp';
import renaultKwid7 from '@/assets/renault-kwid-7.webp';
import renaultKwid8 from '@/assets/renault-kwid-8.webp';
import renaultKwid9 from '@/assets/renault-kwid-9.webp';
import renaultKwid10 from '@/assets/renault-kwid-10.webp';
import fordMaverick1 from '@/assets/ford-maverick-1.webp';
import fordMaverick2 from '@/assets/ford-maverick-2.webp';
import fordMaverick3 from '@/assets/ford-maverick-3.webp';
import fordMaverick4 from '@/assets/ford-maverick-4.webp';
import fordMaverick5 from '@/assets/ford-maverick-5.webp';
import fordMaverick6 from '@/assets/ford-maverick-6.webp';
import fordMaverick7 from '@/assets/ford-maverick-7.webp';
import fordMaverick8 from '@/assets/ford-maverick-8.webp';
import fordMaverick9 from '@/assets/ford-maverick-9.webp';
import fordMaverick10 from '@/assets/ford-maverick-10.webp';

export interface Vehiculo {
  id: string;
  marca: string;
  modelo: string;
  año: number;
  kilometraje: number;
  combustible: string;
  precio: number;
  imagen: string;
  imagenes?: string[];
  categoria: string;
  destacado?: boolean;
  moneda?: 'USD' | 'ARS';
}

const ramImagenes = [
  ram1500Image1, ram1500Image2, ram1500Image3, ram1500Image4, ram1500Image5,
  ram1500Image6, ram1500Image7, ram1500Image8, ram1500Image9, ram1500Image10, ram1500Image11,
];

const nissanImagenes = [
  nissanKicks1, nissanKicks2, nissanKicks3, nissanKicks4, nissanKicks5,
  nissanKicks6, nissanKicks7, nissanKicks8, nissanKicks9, nissanKicks10,
  nissanKicks11, nissanKicks12, nissanKicks13, nissanKicks14, nissanKicks15,
  nissanKicks16, nissanKicks17, nissanKicks18, nissanKicks19,
];

const fordRaptorImagenes = [
  fordRaptor1, fordRaptor2, fordRaptor3, fordRaptor4, fordRaptor5,
  fordRaptor6, fordRaptor7, fordRaptor8, fordRaptor9, fordRaptor10,
  fordRaptor11, fordRaptor12, fordRaptor13, fordRaptor14, fordRaptor15,
  fordRaptor16, fordRaptor17, fordRaptor18, fordRaptor19, fordRaptor20,
];

const renaultKwidImagenes = [
  renaultKwid1, renaultKwid2, renaultKwid3, renaultKwid4, renaultKwid5,
  renaultKwid6, renaultKwid7, renaultKwid8, renaultKwid9, renaultKwid10,
];

const fordMaverickImagenes = [
  fordMaverick1, fordMaverick2, fordMaverick3, fordMaverick4, fordMaverick5,
  fordMaverick6, fordMaverick7, fordMaverick8, fordMaverick9, fordMaverick10,
];

// Vehículos destacados (con fotos reales)
export const vehiculosDestacados: Vehiculo[] = [
  { 
    id: '1', 
    marca: 'RAM', 
    modelo: '1500 5.7 Laramie Atx V8', 
    año: 2015, 
    kilometraje: 152000, 
    combustible: 'Nafta', 
    precio: 35200, 
    imagen: ram1500Image1, 
    imagenes: ramImagenes, 
    categoria: 'Camionetas', 
    destacado: true 
  },
  { 
    id: '2', 
    marca: 'Nissan', 
    modelo: 'Kicks 1.6 Advance Cvt', 
    año: 2021, 
    kilometraje: 67000, 
    combustible: 'Nafta', 
    precio: 19990, 
    imagen: nissanKicks1, 
    imagenes: nissanImagenes, 
    categoria: 'SUV', 
    destacado: true 
  },
  { 
    id: '3', 
    marca: 'Ford', 
    modelo: 'F-150 Raptor 3.5l Bi-turbo', 
    año: 2023, 
    kilometraje: 51000, 
    combustible: 'Nafta', 
    precio: 117000, 
    imagen: fordRaptor1, 
    imagenes: fordRaptorImagenes, 
    categoria: 'Camionetas', 
    destacado: true 
  },
];

// Otros vehículos del catálogo
const otrosVehiculos: Vehiculo[] = [
  // Compactos
  { 
    id: '4', 
    marca: 'Renault', 
    modelo: 'Kwid 1.0 Sce 66cv Outside', 
    año: 2020, 
    kilometraje: 84000, 
    combustible: 'Nafta', 
    precio: 15990000, 
    imagen: renaultKwid1, 
    imagenes: renaultKwidImagenes, 
    categoria: 'Compactos', 
    moneda: 'ARS'
  },
  // Camionetas
  { 
    id: '5', 
    marca: 'Ford', 
    modelo: 'Maverick 2.0 Ecoboost Cd Lariat At8 4wd', 
    año: 2022, 
    kilometraje: 19500, 
    combustible: 'Nafta', 
    precio: 33999, 
    imagen: fordMaverick1, 
    imagenes: fordMaverickImagenes, 
    categoria: 'Camionetas'
  },
];

// Catálogo completo: destacados primero + otros vehículos
export const todosLosVehiculos: Vehiculo[] = [
  ...vehiculosDestacados,
  ...otrosVehiculos,
];

export const categorias = ['Todos', 'Compactos', 'SUV', 'Camionetas', 'Sedanes', '4x4'];
