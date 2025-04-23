import all from '../assets/all.png';
import batminton from '../assets/batminton.jpg';
import champ from '../assets/champ.png';
import football from '../assets/football.jpg';
import ntu from '../assets/ntu.png';
import olympic from '../assets/olympic.jpg';
import sportsbox from '../assets/sportsbox.png';

export const clubs = [
    {
      name: "Cricket Club",
      description: "We promote cricket among university students.",
      email: "cricket@university.edu",
      phone: "+94 71 555 1122",
      img: all,
      competitions: ["Inter-University Cricket Cup", "Summer League"],
      location: { lat: 6.9271, lng: 79.8612 }, // Colombo,
      city: "Colombo",
    },
    {
      name: "Basketball Club",
      description: "Join us for high-energy games and tournaments.",
      email: "basketball@university.edu",
      phone: "+94 71 555 1123",
      img: sportsbox,
      competitions: ["Campus Hoops", "All-Star Match"],
      location: { lat: 7.2906, lng: 80.6337 }, // Kandy,
      city: "Kandy",

    },
    {
      name: "Swimming Club",
      description: "We dive into fun and competitive swimming.",
      email: "swimming@university.edu",
      phone: "+94 71 555 1112",
      img: champ,
      competitions: ["University Swim Meet", "Water Polo Challenge"],
      location: { lat: 6.0535, lng: 80.2210 }, // Galle,
      city: "Galle",
    },
    {
      name: "Athletics Club",
      description: "Run, jump, throw — we do it all!",
      email: "athletics@university.edu",
      phone: "+94 71 555 8122",
      img: football,
      competitions: ["Track & Field Day", "Marathon"],
      location: { lat: 8.3114, lng: 80.4037 }, // Anuradhapura,
      city: "Anuradhapura",
    },
    {
      name: "Badminton Club",
      description: "Smash your way to glory with our badminton team!",
      email: "badminton@university.edu",
      phone: "+94 71 155 1122",
      img: batminton,
      competitions: ["Shuttle Champs", "Inter-Uni Badminton"],
      location: { lat: 7.8731, lng: 80.7718 }, // ,
      city: "Central SL",
    },
    {
      name: "Table Tennis Club",
      description: "Fast-paced rallies and fun!",
      email: "tt@university.edu",
      phone: "+94 73 555 1122",
      img: ntu,
      competitions: ["Ping Pong Cup", "Racket Rally"],
      location: { lat: 6.9271, lng: 79.8612 }, // Colombo,
      city: "Colombo",
    },
    {
      name: "Karate Club",
      description: "Discipline, strength, and competition in martial arts.",
      email: "karate@university.edu",
      phone: "+94 71 555 1022",
      img: champ,
      competitions: ["Dojo League", "All-Island Karate Meet"],
      location: { lat: 6.7010, lng: 80.4037 }, // Ratnapura,
      city: "Ratnapura",
    },
    {
      name: "Rowing Club",
      description: "Row through the heart of Sri Lanka’s waterways.",
      email: "rowing@university.edu",
      phone: "+94 71 558 1122",
      img: sportsbox,
      competitions: ["Lake Regatta", "Inter-Uni Rowing"],
      location: { lat: 6.8880, lng: 79.9607 }, // Diyawanna, Colombo,
      city: "Colombo",
    },
    {
      name: "Rugby Club",
      description: "For the strong and strategic!",
      email: "rugby@university.edu",
      phone: "+94 71 655 1122",
      img: all,
      competitions: ["Rugby 7s", "Inter-Faculty League"],
      location: { lat: 9.6615, lng: 80.0255 }, // Jaffna,
      city: "Jaffna",
    },
    {
      name: "Volleyball Club",
      description: "Spike, block, and score with our team.",
      email: "volleyball@university.edu",
      phone: "+94 71 555 1120",
      img: olympic,
      competitions: ["Beach Volleyball Showdown", "Indoor Smash"],
      location: { lat: 6.6141, lng: 80.5549 }, // Embilipitiya,
      city: "Embilipitiya",
    },
  ];
  