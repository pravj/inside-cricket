import React, { Component } from 'react'
import * as d3 from 'd3';
import d3tip from 'd3-tip';
import scrollama from 'scrollama';

const bowlers = [
  {
    "name": "M Muralitharan",
    "wickets": 534,
    "avg": 23.08,
    "econ": 3.93,
    "sr": 35.2
  },
  {
    "name": "Wasim Akram",
    "wickets": 502,
    "avg": 23.52,
    "econ": 3.89,
    "sr": 36.2
  },
  {
    "name": "Waqar Younis",
    "wickets": 416,
    "avg": 23.84,
    "econ": 4.68,
    "sr": 30.5
  },
  {
    "name": "WPUJC Vaas",
    "wickets": 400,
    "avg": 27.53,
    "econ": 4.18,
    "sr": 39.4
  },
  {
    "name": "Shahid Afridi",
    "wickets": 395,
    "avg": 34.51,
    "econ": 4.62,
    "sr": 44.7
  },
  {
    "name": "SM Pollock",
    "wickets": 393,
    "avg": 24.5,
    "econ": 3.67,
    "sr": 39.9
  },
  {
    "name": "GD McGrath",
    "wickets": 381,
    "avg": 22.02,
    "econ": 3.88,
    "sr": 34
  },
  {
    "name": "B Lee",
    "wickets": 380,
    "avg": 23.36,
    "econ": 4.76,
    "sr": 29.4
  },
  {
    "name": "A Kumble",
    "wickets": 337,
    "avg": 30.89,
    "econ": 4.3,
    "sr": 43
  },
  {
    "name": "ST Jayasuriya",
    "wickets": 323,
    "avg": 36.75,
    "econ": 4.78,
    "sr": 46
  },
  {
    "name": "J Srinath",
    "wickets": 315,
    "avg": 28.08,
    "econ": 4.44,
    "sr": 37.8
  },
  {
    "name": "DL Vettori",
    "wickets": 305,
    "avg": 31.71,
    "econ": 4.12,
    "sr": 46
  },
  {
    "name": "SL Malinga",
    "wickets": 301,
    "avg": 28.92,
    "econ": 5.31,
    "sr": 32.6
  },
  {
    "name": "SK Warne",
    "wickets": 293,
    "avg": 25.73,
    "econ": 4.25,
    "sr": 36.3
  },
  {
    "name": "AB Agarkar",
    "wickets": 288,
    "avg": 27.85,
    "econ": 5.07,
    "sr": 32.9
  },
  {
    "name": "Saqlain Mushtaq",
    "wickets": 288,
    "avg": 21.78,
    "econ": 4.29,
    "sr": 30.4
  },
  {
    "name": "Z Khan",
    "wickets": 282,
    "avg": 29.43,
    "econ": 4.93,
    "sr": 35.8
  },
  {
    "name": "JH Kallis",
    "wickets": 273,
    "avg": 31.79,
    "econ": 4.84,
    "sr": 39.3
  },
  {
    "name": "AA Donald",
    "wickets": 272,
    "avg": 21.78,
    "econ": 4.15,
    "sr": 31.4
  },
  {
    "name": "Abdul Razzaq",
    "wickets": 269,
    "avg": 31.83,
    "econ": 4.69,
    "sr": 40.6
  },
  {
    "name": "JM Anderson",
    "wickets": 269,
    "avg": 29.22,
    "econ": 4.92,
    "sr": 35.6
  },
  {
    "name": "Harbhajan Singh",
    "wickets": 269,
    "avg": 33.35,
    "econ": 4.31,
    "sr": 46.3
  },
  {
    "name": "M Ntini",
    "wickets": 266,
    "avg": 24.65,
    "econ": 4.53,
    "sr": 32.6
  },
  {
    "name": "N Kapil Dev",
    "wickets": 253,
    "avg": 27.45,
    "econ": 3.71,
    "sr": 44.2
  },
  {
    "name": "Shoaib Akhtar",
    "wickets": 247,
    "avg": 24.97,
    "econ": 4.76,
    "sr": 31.4
  },
  {
    "name": "KD Mills",
    "wickets": 240,
    "avg": 27.02,
    "econ": 4.72,
    "sr": 34.2
  },
  {
    "name": "MG Johnson",
    "wickets": 239,
    "avg": 25.26,
    "econ": 4.83,
    "sr": 31.3
  },
  {
    "name": "HH Streak",
    "wickets": 239,
    "avg": 29.82,
    "econ": 4.51,
    "sr": 39.6
  },
  {
    "name": "D Gough",
    "wickets": 235,
    "avg": 26.42,
    "econ": 4.39,
    "sr": 36
  },
  {
    "name": "Mashrafe Mortaza",
    "wickets": 232,
    "avg": 31.4,
    "econ": 4.79,
    "sr": 39.3
  },
  {
    "name": "CA Walsh",
    "wickets": 227,
    "avg": 30.47,
    "econ": 3.83,
    "sr": 47.6
  },
  {
    "name": "Shakib Al Hasan",
    "wickets": 226,
    "avg": 29.95,
    "econ": 4.44,
    "sr": 40.4
  },
  {
    "name": "CEL Ambrose",
    "wickets": 225,
    "avg": 24.12,
    "econ": 3.48,
    "sr": 41.5
  },
  {
    "name": "Abdur Razzak",
    "wickets": 207,
    "avg": 29.29,
    "econ": 4.56,
    "sr": 38.4
  },
  {
    "name": "CZ Harris",
    "wickets": 203,
    "avg": 37.5,
    "econ": 4.28,
    "sr": 52.5
  },
  {
    "name": "CJ McDermott",
    "wickets": 203,
    "avg": 24.71,
    "econ": 4.03,
    "sr": 36.7
  },
  {
    "name": "CL Cairns",
    "wickets": 201,
    "avg": 32.8,
    "econ": 4.84,
    "sr": 40.6
  },
  {
    "name": "DJ Bravo",
    "wickets": 199,
    "avg": 29.51,
    "econ": 5.41,
    "sr": 32.7
  },
  {
    "name": "KMDN Kulasekara",
    "wickets": 199,
    "avg": 33.92,
    "econ": 4.9,
    "sr": 41.5
  },
  {
    "name": "BKV Prasad",
    "wickets": 196,
    "avg": 32.3,
    "econ": 4.67,
    "sr": 41.4
  },
  {
    "name": "SR Waugh",
    "wickets": 195,
    "avg": 34.67,
    "econ": 4.56,
    "sr": 45.5
  },
  {
    "name": "CL Hooper",
    "wickets": 193,
    "avg": 36.05,
    "econ": 4.36,
    "sr": 49.6
  },
  {
    "name": "L Klusener",
    "wickets": 192,
    "avg": 29.95,
    "econ": 4.7,
    "sr": 38.2
  },
  {
    "name": "CRD Fernando",
    "wickets": 187,
    "avg": 30.2,
    "econ": 5.2,
    "sr": 34.7
  },
  {
    "name": "M Morkel",
    "wickets": 186,
    "avg": 24.48,
    "econ": 4.94,
    "sr": 29.7
  },
  {
    "name": "Saeed Ajmal",
    "wickets": 184,
    "avg": 22.72,
    "econ": 4.18,
    "sr": 32.6
  },
  {
    "name": "Aaqib Javed",
    "wickets": 182,
    "avg": 31.43,
    "econ": 4.28,
    "sr": 44
  },
  {
    "name": "Imran Khan",
    "wickets": 182,
    "avg": 26.61,
    "econ": 3.89,
    "sr": 40.9
  },
  {
    "name": "DW Steyn",
    "wickets": 180,
    "avg": 26.62,
    "econ": 4.94,
    "sr": 32.3
  },
  {
    "name": "Umar Gul",
    "wickets": 179,
    "avg": 29.34,
    "econ": 5.19,
    "sr": 33.8
  },
  {
    "name": "SCJ Broad",
    "wickets": 178,
    "avg": 30.13,
    "econ": 5.26,
    "sr": 34.3
  },
  {
    "name": "NW Bracken",
    "wickets": 174,
    "avg": 24.36,
    "econ": 4.41,
    "sr": 33
  },
  {
    "name": "JDP Oram",
    "wickets": 173,
    "avg": 29.17,
    "econ": 4.38,
    "sr": 39.9
  },
  {
    "name": "IK Pathan",
    "wickets": 173,
    "avg": 29.72,
    "econ": 5.26,
    "sr": 33.8
  },
  {
    "name": "A Flintoff",
    "wickets": 169,
    "avg": 24.38,
    "econ": 4.39,
    "sr": 33.2
  },
  {
    "name": "SR Watson",
    "wickets": 168,
    "avg": 31.79,
    "econ": 4.95,
    "sr": 38.4
  },
  {
    "name": "TG Southee",
    "wickets": 166,
    "avg": 33.51,
    "econ": 5.4,
    "sr": 37.2
  },
  {
    "name": "CH Gayle",
    "wickets": 163,
    "avg": 35.2,
    "econ": 4.76,
    "sr": 44.3
  },
  {
    "name": "Mushtaq Ahmed",
    "wickets": 161,
    "avg": 33.29,
    "econ": 4.26,
    "sr": 46.8
  },
  {
    "name": "Sir RJ Hadlee",
    "wickets": 158,
    "avg": 21.56,
    "econ": 3.3,
    "sr": 39.1
  },
  {
    "name": "MD Marshall",
    "wickets": 157,
    "avg": 26.96,
    "econ": 3.53,
    "sr": 45.7
  },
  {
    "name": "A Nehra",
    "wickets": 157,
    "avg": 31.72,
    "econ": 5.19,
    "sr": 36.6
  },
  {
    "name": "M Prabhakar",
    "wickets": 157,
    "avg": 28.87,
    "econ": 4.27,
    "sr": 40.5
  },
  {
    "name": "GB Hogg",
    "wickets": 156,
    "avg": 26.84,
    "econ": 4.51,
    "sr": 35.6
  },
  {
    "name": "RA Jadeja",
    "wickets": 155,
    "avg": 35.87,
    "econ": 4.9,
    "sr": 43.9
  },
  {
    "name": "Shoaib Malik",
    "wickets": 154,
    "avg": 38.45,
    "econ": 4.65,
    "sr": 49.5
  },
  {
    "name": "SR Tendulkar",
    "wickets": 154,
    "avg": 44.48,
    "econ": 5.1,
    "sr": 52.2
  },
  {
    "name": "BAW Mendis",
    "wickets": 152,
    "avg": 21.86,
    "econ": 4.8,
    "sr": 27.3
  },
  {
    "name": "UDU Chandana",
    "wickets": 151,
    "avg": 31.9,
    "econ": 4.7,
    "sr": 40.6
  },
  {
    "name": "R Ashwin",
    "wickets": 150,
    "avg": 32.91,
    "econ": 4.91,
    "sr": 40.1
  },
  {
    "name": "SE Bond",
    "wickets": 147,
    "avg": 20.88,
    "econ": 4.28,
    "sr": 29.2
  },
  {
    "name": "J Garner",
    "wickets": 146,
    "avg": 18.84,
    "econ": 3.09,
    "sr": 36.5
  },
  {
    "name": "IT Botham",
    "wickets": 145,
    "avg": 28.54,
    "econ": 3.96,
    "sr": 43.2
  },
  {
    "name": "TM Odoyo",
    "wickets": 145,
    "avg": 29.89,
    "econ": 4.6,
    "sr": 38.9
  },
  {
    "name": "JN Gillespie",
    "wickets": 142,
    "avg": 25.42,
    "econ": 4.21,
    "sr": 36.2
  },
  {
    "name": "MA Holding",
    "wickets": 142,
    "avg": 21.36,
    "econ": 3.32,
    "sr": 38.5
  },
  {
    "name": "EJ Chatfield",
    "wickets": 140,
    "avg": 25.84,
    "econ": 3.57,
    "sr": 43.3
  },
  {
    "name": "HDPK Dharmasena",
    "wickets": 138,
    "avg": 36.21,
    "econ": 4.27,
    "sr": 50.7
  },
  {
    "name": "Imran Tahir",
    "wickets": 138,
    "avg": 23.72,
    "econ": 4.64,
    "sr": 30.6
  },
  {
    "name": "NLTC Perera",
    "wickets": 138,
    "avg": 32.41,
    "econ": 5.83,
    "sr": 33.3
  },
  {
    "name": "SB Styris",
    "wickets": 137,
    "avg": 35.32,
    "econ": 4.74,
    "sr": 44.6
  },
  {
    "name": "Mohammad Hafeez",
    "wickets": 136,
    "avg": 36.9,
    "econ": 4.11,
    "sr": 53.7
  },
  {
    "name": "MF Maharoof",
    "wickets": 135,
    "avg": 28.06,
    "econ": 4.89,
    "sr": 34.3
  },
  {
    "name": "DW Fleming",
    "wickets": 134,
    "avg": 25.38,
    "econ": 4.41,
    "sr": 34.4
  },
  {
    "name": "MA Starc",
    "wickets": 134,
    "avg": 20.13,
    "econ": 4.81,
    "sr": 25
  },
  {
    "name": "A Symonds",
    "wickets": 133,
    "avg": 37.25,
    "econ": 5,
    "sr": 44.6
  },
  {
    "name": "P Utseya",
    "wickets": 133,
    "avg": 46.9,
    "econ": 4.36,
    "sr": 64.4
  },
  {
    "name": "Abdul Qadir",
    "wickets": 132,
    "avg": 26.16,
    "econ": 4.06,
    "sr": 38.6
  },
  {
    "name": "M Dillon",
    "wickets": 130,
    "avg": 32.44,
    "econ": 4.61,
    "sr": 42.1
  },
  {
    "name": "RJ Shastri",
    "wickets": 129,
    "avg": 36.04,
    "econ": 4.21,
    "sr": 51.2
  },
  {
    "name": "JE Taylor",
    "wickets": 128,
    "avg": 29.53,
    "econ": 5.22,
    "sr": 33.9
  },
  {
    "name": "DK Morrison",
    "wickets": 126,
    "avg": 27.53,
    "econ": 4.53,
    "sr": 36.3
  },
  {
    "name": "Mohammad Rafique",
    "wickets": 125,
    "avg": 37.91,
    "econ": 4.43,
    "sr": 51.3
  },
  {
    "name": "Azhar Mahmood",
    "wickets": 123,
    "avg": 39.13,
    "econ": 4.62,
    "sr": 50.7
  },
  {
    "name": "Mohammad Sami",
    "wickets": 121,
    "avg": 29.47,
    "econ": 4.99,
    "sr": 35.4
  },
  {
    "name": "IR Bishop",
    "wickets": 118,
    "avg": 26.5,
    "econ": 4.33,
    "sr": 36.7
  },
  {
    "name": "IVA Richards",
    "wickets": 118,
    "avg": 35.83,
    "econ": 4.49,
    "sr": 47.8
  },
  {
    "name": "R Rampaul",
    "wickets": 117,
    "avg": 29.35,
    "econ": 5.1,
    "sr": 34.4
  },
  {
    "name": "PAJ DeFreitas",
    "wickets": 115,
    "avg": 32.82,
    "econ": 3.96,
    "sr": 49.6
  },
  {
    "name": "I Sharma",
    "wickets": 115,
    "avg": 30.98,
    "econ": 5.72,
    "sr": 32.4
  }
];

const batsmen = [
  {
    "name": "SR Tendulkar",
    "runs": 18426,
    "avg": 44.83,
    "sr": 86.23
  },
  {
    "name": "KC Sangakkara",
    "runs": 14234,
    "avg": 41.98,
    "sr": 78.86
  },
  {
    "name": "RT Ponting",
    "runs": 13704,
    "avg": 42.03,
    "sr": 80.39
  },
  {
    "name": "ST Jayasuriya",
    "runs": 13430,
    "avg": 32.36,
    "sr": 91.2
  },
  {
    "name": "DPMD Jayawardene",
    "runs": 12650,
    "avg": 33.37,
    "sr": 78.96
  },
  {
    "name": "Inzamam-ul-Haq",
    "runs": 11739,
    "avg": 39.52,
    "sr": 74.24
  },
  {
    "name": "JH Kallis",
    "runs": 11579,
    "avg": 44.36,
    "sr": 72.89
  },
  {
    "name": "SC Ganguly",
    "runs": 11363,
    "avg": 41.02,
    "sr": 73.7
  },
  {
    "name": "R Dravid",
    "runs": 10889,
    "avg": 39.16,
    "sr": 71.24
  },
  {
    "name": "BC Lara",
    "runs": 10405,
    "avg": 40.48,
    "sr": 79.51
  },
  {
    "name": "TM Dilshan",
    "runs": 10290,
    "avg": 39.27,
    "sr": 86.23
  },
  {
    "name": "MS Dhoni",
    "runs": 9898,
    "avg": 51.55,
    "sr": 88.46
  },
  {
    "name": "Mohammad Yousuf",
    "runs": 9720,
    "avg": 41.71,
    "sr": 75.1
  },
  {
    "name": "AC Gilchrist",
    "runs": 9619,
    "avg": 35.89,
    "sr": 96.94
  },
  {
    "name": "AB de Villiers",
    "runs": 9515,
    "avg": 54.06,
    "sr": 101.07
  },
  {
    "name": "CH Gayle",
    "runs": 9420,
    "avg": 37.23,
    "sr": 85.56
  },
  {
    "name": "M Azharuddin",
    "runs": 9378,
    "avg": 36.92,
    "sr": 74.02
  },
  {
    "name": "PA de Silva",
    "runs": 9284,
    "avg": 34.9,
    "sr": 81.13
  },
  {
    "name": "V Kohli",
    "runs": 9030,
    "avg": 55.74,
    "sr": 91.73
  },
  {
    "name": "Saeed Anwar",
    "runs": 8824,
    "avg": 39.21,
    "sr": 80.67
  },
  {
    "name": "S Chanderpaul",
    "runs": 8778,
    "avg": 41.6,
    "sr": 70.74
  },
  {
    "name": "Yuvraj Singh",
    "runs": 8701,
    "avg": 36.55,
    "sr": 87.67
  },
  {
    "name": "DL Haynes",
    "runs": 8648,
    "avg": 41.37,
    "sr": 63.09
  },
  {
    "name": "MS Atapattu",
    "runs": 8529,
    "avg": 37.57,
    "sr": 67.72
  },
  {
    "name": "ME Waugh",
    "runs": 8500,
    "avg": 39.35,
    "sr": 76.9
  },
  {
    "name": "V Sehwag",
    "runs": 8273,
    "avg": 35.05,
    "sr": 104.33
  },
  {
    "name": "HH Gibbs",
    "runs": 8094,
    "avg": 36.13,
    "sr": 83.26
  },
  {
    "name": "Shahid Afridi",
    "runs": 8064,
    "avg": 23.57,
    "sr": 117
  },
  {
    "name": "SP Fleming",
    "runs": 8037,
    "avg": 32.4,
    "sr": 71.49
  },
  {
    "name": "MJ Clarke",
    "runs": 7981,
    "avg": 44.58,
    "sr": 78.98
  },
  {
    "name": "SR Waugh",
    "runs": 7569,
    "avg": 32.9,
    "sr": 75.91
  },
  {
    "name": "A Ranatunga",
    "runs": 7456,
    "avg": 35.84,
    "sr": 77.9
  },
  {
    "name": "HM Amla",
    "runs": 7381,
    "avg": 51.25,
    "sr": 89.21
  },
  {
    "name": "Javed Miandad",
    "runs": 7381,
    "avg": 41.7,
    "sr": 67.01
  },
  {
    "name": "Younis Khan",
    "runs": 7249,
    "avg": 31.24,
    "sr": 75.29
  },
  {
    "name": "Saleem Malik",
    "runs": 7170,
    "avg": 32.88,
    "sr": 76.41
  },
  {
    "name": "NJ Astle",
    "runs": 7090,
    "avg": 34.92,
    "sr": 72.64
  },
  {
    "name": "GC Smith",
    "runs": 6989,
    "avg": 37.98,
    "sr": 80.81
  },
  {
    "name": "Shoaib Malik",
    "runs": 6926,
    "avg": 35.7,
    "sr": 82.11
  },
  {
    "name": "MG Bevan",
    "runs": 6912,
    "avg": 53.58,
    "sr": 74.16
  },
  {
    "name": "G Kirsten",
    "runs": 6798,
    "avg": 40.95,
    "sr": 72.04
  },
  {
    "name": "LRPL Taylor",
    "runs": 6794,
    "avg": 44.99,
    "sr": 82.03
  },
  {
    "name": "A Flower",
    "runs": 6786,
    "avg": 35.34,
    "sr": 74.59
  },
  {
    "name": "IVA Richards",
    "runs": 6721,
    "avg": 47,
    "sr": 90.2
  },
  {
    "name": "WU Tharanga",
    "runs": 6632,
    "avg": 34.72,
    "sr": 76
  },
  {
    "name": "GW Flower",
    "runs": 6571,
    "avg": 33.52,
    "sr": 67.58
  },
  {
    "name": "Ijaz Ahmed",
    "runs": 6564,
    "avg": 32.33,
    "sr": 80.3
  },
  {
    "name": "AR Border",
    "runs": 6524,
    "avg": 30.62,
    "sr": 71.42
  },
  {
    "name": "RG Sharma",
    "runs": 6424,
    "avg": 45.23,
    "sr": 87.08
  },
  {
    "name": "RB Richardson",
    "runs": 6248,
    "avg": 33.41,
    "sr": 63.74
  },
  {
    "name": "ML Hayden",
    "runs": 6133,
    "avg": 43.8,
    "sr": 78.96
  },
  {
    "name": "BB McCullum",
    "runs": 6083,
    "avg": 30.41,
    "sr": 96.37
  },
  {
    "name": "DM Jones",
    "runs": 6068,
    "avg": 44.61,
    "sr": 72.56
  },
  {
    "name": "DC Boon",
    "runs": 5964,
    "avg": 37.04,
    "sr": 65.13
  },
  {
    "name": "Mohammad Hafeez",
    "runs": 5959,
    "avg": 32.92,
    "sr": 75.49
  },
  {
    "name": "JN Rhodes",
    "runs": 5935,
    "avg": 35.11,
    "sr": 80.9
  },
  {
    "name": "Rameez Raja",
    "runs": 5841,
    "avg": 32.09,
    "sr": 63.31
  },
  {
    "name": "RR Sarwan",
    "runs": 5804,
    "avg": 42.67,
    "sr": 75.74
  },
  {
    "name": "EJG Morgan",
    "runs": 5801,
    "avg": 38.16,
    "sr": 88.67
  },
  {
    "name": "Tamim Iqbal",
    "runs": 5766,
    "avg": 34.32,
    "sr": 78.36
  },
  {
    "name": "CL Hooper",
    "runs": 5761,
    "avg": 35.34,
    "sr": 76.63
  },
  {
    "name": "SR Watson",
    "runs": 5757,
    "avg": 40.54,
    "sr": 90.44
  },
  {
    "name": "SK Raina",
    "runs": 5568,
    "avg": 35.46,
    "sr": 93.76
  },
  {
    "name": "WJ Cronje",
    "runs": 5565,
    "avg": 38.64,
    "sr": 76.47
  },
  {
    "name": "MJ Guptill",
    "runs": 5553,
    "avg": 42.71,
    "sr": 87.58
  },
  {
    "name": "MEK Hussey",
    "runs": 5442,
    "avg": 48.15,
    "sr": 87.16
  },
  {
    "name": "IR Bell",
    "runs": 5416,
    "avg": 37.87,
    "sr": 77.16
  },
  {
    "name": "A Jadeja",
    "runs": 5359,
    "avg": 37.47,
    "sr": 69.8
  },
  {
    "name": "DR Martyn",
    "runs": 5346,
    "avg": 40.8,
    "sr": 77.73
  },
  {
    "name": "BRM Taylor",
    "runs": 5258,
    "avg": 34.82,
    "sr": 74.47
  },
  {
    "name": "MN Samuels",
    "runs": 5241,
    "avg": 33.81,
    "sr": 75.75
  },
  {
    "name": "G Gambhir",
    "runs": 5238,
    "avg": 39.68,
    "sr": 85.25
  },
  {
    "name": "ADR Campbell",
    "runs": 5185,
    "avg": 30.5,
    "sr": 66.18
  },
  {
    "name": "RS Mahanama",
    "runs": 5162,
    "avg": 29.49,
    "sr": 60.57
  },
  {
    "name": "CG Greenidge",
    "runs": 5134,
    "avg": 45.03,
    "sr": 64.92
  },
  {
    "name": "Misbah-ul-Haq",
    "runs": 5122,
    "avg": 43.4,
    "sr": 73.75
  },
  {
    "name": "PD Collingwood",
    "runs": 5092,
    "avg": 35.36,
    "sr": 76.98
  },
  {
    "name": "A Symonds",
    "runs": 5088,
    "avg": 39.75,
    "sr": 92.44
  },
  {
    "name": "Abdul Razzaq",
    "runs": 5080,
    "avg": 29.7,
    "sr": 81.25
  },
  {
    "name": "Shakib Al Hasan",
    "runs": 5080,
    "avg": 34.79,
    "sr": 81
  },
  {
    "name": "AD Mathews",
    "runs": 5065,
    "avg": 41.85,
    "sr": 83.95
  },
  {
    "name": "H Masakadza",
    "runs": 5023,
    "avg": 29.03,
    "sr": 74.24
  },
  {
    "name": "CL Cairns",
    "runs": 4950,
    "avg": 29.46,
    "sr": 84.26
  },
  {
    "name": "Aamer Sohail",
    "runs": 4780,
    "avg": 31.86,
    "sr": 65.5
  },
  {
    "name": "KS Williamson",
    "runs": 4716,
    "avg": 46.23,
    "sr": 83.91
  },
  {
    "name": "CD McMillan",
    "runs": 4707,
    "avg": 28.18,
    "sr": 75.94
  },
  {
    "name": "MD Crowe",
    "runs": 4704,
    "avg": 38.55,
    "sr": 72.63
  },
  {
    "name": "MV Boucher",
    "runs": 4686,
    "avg": 28.57,
    "sr": 84.76
  },
  {
    "name": "AJ Stewart",
    "runs": 4677,
    "avg": 31.6,
    "sr": 68.36
  },
  {
    "name": "JP Duminy",
    "runs": 4668,
    "avg": 37.64,
    "sr": 83.52
  },
  {
    "name": "Mushfiqur Rahim",
    "runs": 4576,
    "avg": 32.92,
    "sr": 76.95
  },
  {
    "name": "SB Styris",
    "runs": 4483,
    "avg": 32.48,
    "sr": 79.41
  },
  {
    "name": "KP Pietersen",
    "runs": 4440,
    "avg": 40.73,
    "sr": 86.58
  },
  {
    "name": "NS Sidhu",
    "runs": 4413,
    "avg": 37.08,
    "sr": 69.72
  },
  {
    "name": "CZ Harris",
    "runs": 4379,
    "avg": 29,
    "sr": 66.51
  },
  {
    "name": "GR Marsh",
    "runs": 4357,
    "avg": 39.97,
    "sr": 55.93
  },
  {
    "name": "ME Trescothick",
    "runs": 4335,
    "avg": 37.37,
    "sr": 85.21
  },
  {
    "name": "GA Gooch",
    "runs": 4290,
    "avg": 36.98,
    "sr": 61.88
  },
  {
    "name": "DA Warner",
    "runs": 4270,
    "avg": 44.94,
    "sr": 96.58
  },
  {
    "name": "F du Plessis",
    "runs": 4259,
    "avg": 43.9,
    "sr": 87.86
  }
];

/*
all-rounder players
*/

const p = ['CL Cairns',
  'CZ Harris',
  'SR Waugh',
  'IVA Richards',
  'ST Jayasuriya',
  'SR Watson',
  'Shakib Al Hasan',
  'SB Styris',
  'Abdul Razzaq',
  'JH Kallis',
  'A Symonds',
  'Shoaib Malik',
  'SR Tendulkar',
  'Shahid Afridi',
  'CL Hooper',
  'Mohammad Hafeez',
  'CH Gayle'];

// all rounder players in the order of batsmen to bowler
const allRounders = [
  { name: 'SR Tendulkar', runs: 18426, wickets: 154 },
  { name: 'CH Gayle', runs: 9420, wickets: 163 },
  { name: 'IVA Richards', runs: 6721, wickets: 118 },
  { name: 'Shoaib Malik', runs: 6926, wickets: 154 },
  { name: 'Mohammad Hafeez', runs: 5959, wickets: 136 },
  { name: 'JH Kallis', runs: 11579, wickets: 273 },
  { name: 'ST Jayasuriya', runs: 13430, wickets: 323 },
  { name: 'SR Waugh', runs: 7569, wickets: 195 },
  { name: 'A Symonds', runs: 5088, wickets: 133 },
  { name: 'SR Watson', runs: 5757, wickets: 168 },
  { name: 'SB Styris', runs: 4483, wickets: 137 },
  { name: 'CL Hooper', runs: 5761, wickets: 193 },
  { name: 'CL Cairns', runs: 4950, wickets: 201 },
  { name: 'Shakib Al Hasan', runs: 5080, wickets: 226 },
  { name: 'CZ Harris', runs: 4379, wickets: 203 },
  { name: 'Shahid Afridi', runs: 8064, wickets: 395 },
  { name: 'Abdul Razzaq', runs: 5080, wickets: 269 },
];

// const colors = ['#feedde', '#fdbe85', '#fd8d3c', '#e6550d', '#a63603'];
// const colors = ['#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#bd0026', '#800026'];
const colors = ['#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#253494', '#081d58'];

/*
* Batsmen
* */

const runs = batsmen.map((v, i) => v.runs)

const maxRun = runs.reduce(function(a, b) {
  return Math.max(a, b);
});

const minRun = runs.reduce(function(a, b) {
  return Math.min(a, b);
});

const getBatsmenColorIndex = (run) => {
  const top = (run - minRun)
  const bottom = (maxRun - minRun)
  let index = Math.round((top/bottom) * 5)
  if (index > 4) {index = 4}
  return index;
};

const getBatsmenColor = (index) => {
  return colors[index];
}

/*
* Bowlers
* */

const wickets = bowlers.map((v, i) => v.wickets)

const maxWicket = wickets.reduce(function(a, b) {
  return Math.max(a, b);
});

const minWicket = wickets.reduce(function(a, b) {
  return Math.min(a, b);
});

const getBowlerColorIndex = (wicket) => {
  const top = (wicket - minWicket)
  const bottom = (maxWicket - minWicket)
  let index = Math.round((top/bottom) * 5)
  if (index > 4) {index = 4}
  return index;
};

const getBowlerColor = (index) => {
  return colors[index];
}

class StrikeAndAverageODI extends Component {
  componentDidMount() {
    const padding = {};
    let isSmallDevice = false;

    const pageWidth = (window.innerWidth || document.body.clientWidth);
    if (pageWidth > 980) {
      padding.left = (pageWidth * 20) / 100;
      padding.right = (pageWidth * 20) / 100;
    } else {
      padding.left = (pageWidth * 5) / 100;
      padding.right = (pageWidth * 5) / 100;

      isSmallDevice = true;
    }

    const width = pageWidth - (2 * padding.left);
    const height = width * 0.6;

    const innerPadding = {
      left: 40,
      right: 40,
      bottom: 10,
    };

    /*
    * scrollama
    * */

    // using d3 for convenience
    const container = d3.select('#batscroll');
    const graphic = container.select('.scroll__graphic');
    const text = container.select('.scroll__text');
    const step = text.selectAll('.step');

    // instantiate the scrollama
    const batScroller = scrollama();

    // callback functions (scrollama event handlers)
    const handleStepEnter = (response) => {
      // response = { element, direction, index }
      console.log('bat step enter', response.index);

      // add color to current step only
      step.classed('is-active', function (d, i) {
        console.log('step', i, response.index);
        return i === response.index;
      })

      // update graphic based on step
      graphic.select('p').text(response.index + 1);
    };

    const handleContainerEnter = (response) => {
      // response = { direction }
      console.log('bat container enter');

      // old school
      // sticky the graphic
      graphic.classed('is-fixed', true);
      graphic.classed('is-bottom', false);
    };

    const handleContainerExit = (response) => {
      // response = { direction }
      console.log('bat container exit');

      // old school
      // un-sticky the graphic, and pin to top/bottom of container
      graphic.classed('is-fixed', false);
      graphic.classed('is-bottom', response.direction === 'down');

      // remove is-active from step elements
      step.classed('is-active', false);
    };

    // setup the instance, pass callback functions
    batScroller.setup({
      container: '#batscroll',
      graphic: '.scroll__graphic',
      text: '.scroll__text',
      step: '.scroll__text .step.bat',
      debug: false,
      offset: 0.5,
    })
        .onStepEnter(handleStepEnter)
        .onContainerEnter(handleContainerEnter)
        .onContainerExit(handleContainerExit);

    /*
    * Batsmen
    * */

    // create an svg container
    const vis = d3.select(".ic-odi-strike-and-average-batsmen").append("svg:svg")
        .attr("width", width)
        .attr("height", height);

    // define the y scale
    const yScale = d3.scaleLinear()
        .domain([50, 130])
        .range([height - innerPadding.bottom, 0]);

    // define the y axis
    const yAxis = d3.axisLeft(yScale)

    // define the x scale
    const xScale = d3.scaleLinear()
        .domain([20, 60])
        .range([innerPadding.left, width - innerPadding.right]);

    // define the x axis
    const xAxis = d3.axisBottom(xScale)

    // append the x axis
    vis.append("g")
        .call(xAxis);

    // append the y axis
    vis.append("g")
        .attr("transform", "translate("+ innerPadding.left +",0)")
        .call(yAxis);

    const batsmenTooltip = d3.select('.ic-odi-strike-and-average-batsmen')
        .append('div')
        .attr('class', 'batsmen-strike-tooltip');

    vis.selectAll('.batsmen-strike-dot')
        .data(batsmen)
        .enter().append('circle')
        .attr('cx', function (d) {
          return xScale(d.avg);
        })
        .attr('cy', function (d) {
          return yScale(d.sr);
        })
        .attr('fill', function (d) {
          return getBatsmenColor(getBatsmenColorIndex(d.runs))
        })
        .attr('opacity', 0.65)
        .attr('r', function (d) {
          return (isSmallDevice ? 1.5 : 3) * (getBatsmenColorIndex(d.runs) + 1);
        })
        .on('mouseover', function (d) {
          // TODO: mention custom implementation of tooltip
          d3.select('.batsmen-strike-tooltip')
              .style('left',  (d3.event.offsetX + padding.left) + 'px')
              .style('top', (d3.event.offsetY - 20) + 'px')
              .style('visibility', 'visible')
              .text(d.name + ' (' + d.runs + ' runs)');
        })
        .on('mouseout', function (d) {
          d3.select('.batsmen-strike-tooltip').style('visibility', 'hidden');
        });

    vis.append('text')
        .attr('x', width - (isSmallDevice? 100 : 200))
        .attr('y', isSmallDevice ? 25 : 50)
        .style('text-anchor', 'middle')
        .style('font-weight', 'bold')
        .style('font-size', isSmallDevice ? '8px' : '12px')
        .text('— (Batting Average) consistent batsmen ⟶');

    vis.append('text')
        .attr("transform", "translate(" + (isSmallDevice ? '100' : '120') + ", " + (isSmallDevice ? '-120' : '-300') + ")rotate(90)")
        .attr('x', width - (isSmallDevice? 100 : 200))
        .attr('y', 50)
        .style('text-anchor', 'middle')
        .style('font-weight', 'bold')
        .style('font-size', isSmallDevice ? '8px' : '12px')
        .text('⟵ (Strike Rate) destructive batsmen —');


    /*
    * Bowlers
    * */

    // using d3 for convenience
    const bowlContainer = d3.select('#bowlscroll');
    const bowlGraphic = bowlContainer.select('.scroll__graphic');
    const bowlText = bowlContainer.select('.scroll__text');
    const bowlStep = bowlText.selectAll('.step');

    console.log(bowlContainer, bowlGraphic, bowlStep, bowlText)

    // instantiate the scrollama
    const bowlScroller = scrollama();

    // callback functions (scrollama event handlers)
    const bowlHandleStepEnter = (response) => {
      console.log('bowl step enter', response.index);
      // response = { element, direction, index }

      // add color to current step only
      bowlStep.classed('is-active', function (d, i) {
        console.log('bowl', i, response.index);
        return i === response.index;
      })

      // update graphic based on step
      bowlGraphic.select('p').text(response.index + 1);
    };

    const bowlHandleContainerEnter = (response) => {
      // response = { direction }
      console.log('bowl container enter');

      // old school
      // sticky the graphic
      bowlGraphic.classed('is-fixed', true);
      bowlGraphic.classed('is-bottom', false);
    };

    const bowlHandleContainerExit = (response) => {
      // response = { direction }
      console.log('bowl container exit');

      // old school
      // un-sticky the graphic, and pin to top/bottom of container
      bowlGraphic.classed('is-fixed', false);
      bowlGraphic.classed('is-bottom', response.direction === 'down');
    };

    // setup the instance, pass callback functions
    bowlScroller.setup({
      container: '#bowlscroll',
      graphic: '.scroll__graphic',
      text: '.scroll__text',
      step: '.scroll__text .step.ball',
      debug: false,
      offset: 0.5,
    })
        .onStepEnter(bowlHandleStepEnter)
        .onContainerEnter(bowlHandleContainerEnter)
        .onContainerExit(bowlHandleContainerExit);

    // create an svg container
    const bowlersVis = d3.select(".ic-odi-strike-and-average-bowlers").append("svg:svg")
        .attr("width", width)
        .attr("height", height);

    // define the y scale
    const bowlersYScale = d3.scaleLinear()
        .domain([3, 6])
        .range([height - innerPadding.bottom, 0]);

    // define the y axis
    const bowlersYAxis = d3.axisLeft(bowlersYScale)

    // define the x scale
    const bowlersXScale = d3.scaleLinear()
        .domain([15, 50])
        .range([innerPadding.left, width - innerPadding.right]);

    // define the x axis
    const bowlersXAxis = d3.axisBottom(bowlersXScale)

    // append the x axis
    bowlersVis.append("g")
        .call(bowlersXAxis);

    // append the y axis
    bowlersVis.append("g")
        .attr("transform", "translate("+ innerPadding.left +",0)")
        .call(bowlersYAxis);

    /*
    const bowlersTip = d3tip().attr('class', 'd3-tip').offset([-10, 0]).html(function(d) {
      return d.name + ' (' + d.wickets + ' wickets)';
    });

    bowlersTip.direction(function(d) {
      return 'n';
    });

    bowlersVis.call(bowlersTip);
    */

    const bowlersTooltip = d3.select('.ic-odi-strike-and-average-bowlers')
        .append('div')
        .attr('class', 'bowlers-strike-tooltip');

    bowlersVis.selectAll('.bowlers-strike-dot')
        .data(bowlers)
        .enter().append('circle')
        .attr('cx', function (d) {
          return bowlersXScale(d.avg);
        })
        .attr('cy', function (d) {
          return bowlersYScale(d.econ);
        })
        .attr('fill', function (d) {
          return getBowlerColor(getBowlerColorIndex(d.wickets))
        })
        .attr('opacity', 0.65)
        .attr('r', function (d) {
          return (isSmallDevice ? 1.5 : 3) * ((getBowlerColorIndex(d.wickets)) + 1);
        })
        .on('mouseover', function (d) {
          // TODO: mention custom implementation of tooltip
          d3.select('.bowlers-strike-tooltip')
              .style('left',  (d3.event.offsetX + padding.left) + 'px')
              .style('top', (d3.event.offsetY - 20) + 'px')
              .style('visibility', 'visible')
              .text(d.name + ' (' + d.wickets + ' wickets)');
        })
        .on('mouseout', function (d) {
          d3.select('.bowlers-strike-tooltip').style('visibility', 'hidden');
        });

    bowlersVis.append('text')
        .attr('x', width - (isSmallDevice? 100 : 200))
        .attr('y', isSmallDevice ? 25 : 50)
        .style('text-anchor', 'middle')
        .style('font-weight', 'bold')
        .style('font-size', isSmallDevice ? '8px' : '12px')
        .text('⟵ (Bowling Average) consistent bowler —');

    bowlersVis.append('text')
        .attr("transform", "translate(" + (isSmallDevice ? '100' : '120') + ", " + (isSmallDevice ? '-120' : '-300') + ")rotate(90)")
        .attr('x', width - (isSmallDevice? 100 : 200))
        .attr('y', 50)
        .style('text-anchor', 'middle')
        .style('font-weight', 'bold')
        .style('font-size', isSmallDevice ? '8px' : '12px')
        .text('— (Economy Rate) economic bowler ⟶');

    /*
    all rounder
     */

    // create an svg container
    const allVis = d3.select(".ic-odi-strike-and-average-all-rounder").append("svg:svg")
        .attr("width", width)
        .attr("height", (allRounders.length + 1) * 40);

    const xPad = isSmallDevice ? 40 : 120;
    console.log('xpad', xPad);

    // left circle represents the runs
    allVis.selectAll('.all-rounder-left-circle')
        .data(allRounders)
        .enter().append('circle')
        .attr('fill', function (d) {
          return colors[Math.round(d.runs/3500)];
        })
        .attr('cx', xPad)
        .attr('cy', function (d, i) {
          return (i + 1) * 40;
        })
        .attr('r', function (d) {
          return d.runs/1000;
        });

    // right circle represents the wickets
    allVis.selectAll('.all-rounder-right-circle')
        .data(allRounders)
        .enter().append('circle')
        .attr('fill', function (d) {
          return colors[Math.round(d.wickets/75)];
        })
        .attr('cx', width - xPad)
        .attr('cy', function (d, i) {
          return (i + 1) * 40;
        })
        .attr('r', function (d) {
          return d.wickets/25;
        });

    // name of all rounder players
    allVis.selectAll('.all-rounder-name')
        .data(allRounders)
        .enter().append('text')
        .attr('x', '50%')
        .attr('y', function (d, i) {
          return (i + 1) * 40;
        })
        .attr('dy', 5)
        .style('text-anchor', 'middle')
        .text(function (d) {
          return d.name;
        });
  }

  render() {
    return (
        <div className="ic-odi-strike-and-average">
          <div id="batscroll">
            <div className="scroll__graphic">
              <div className="ic-odi-strike-and-average-batsmen"/>
            </div>
            <div className="scroll__text">
              <div className='step bat' data-step='1'><p>This is the first paragraph that we will render</p></div>
              <div className='step bat' data-step='2'><p>This is the second paragraph that we will render</p></div>
              <div className='step bat' data-step='3'><p>This is the third paragraph that we will render</p></div>
              <div className='step bat' data-step='4'><p>This is the fourth paragraph that we will render</p></div>
              <div className='step bat' data-step='5'/>
            </div>
          </div>

          <div id="bowlscroll">
            <div className="scroll__graphic">
              <div className="ic-odi-strike-and-average-bowlers"/>
            </div>
            <div className="scroll__text">
              <div className='step ball' data-step='1'><p>This is the first paragraph that we will render</p></div>
              <div className='step ball' data-step='2'><p>This is the second paragraph that we will render</p></div>
              <div className='step ball' data-step='3'><p>This is the third paragraph that we will render</p></div>
              <div className='step ball' data-step='4'><p>This is the fourth paragraph that we will render</p></div>
              <div className='step ball' data-step='5'/>
            </div>
          </div>

          <div className="ic-odi-strike-and-average-all-rounder"/>
        </div>
    );
  }
}

export default StrikeAndAverageODI;