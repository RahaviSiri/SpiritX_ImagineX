import React from 'react';
import SportCard from '../components/SportCard';
import assets from "../assets/assets.js";

const ExploreSports = () => {
  return (
    <div className="min-h-screen px-8 py-20 bg-gradient-to-b from-black via-black/80 to-black text-white">
      <h1 className="text-3xl font-bold text-yellow-400 mb-10 text-center">Explore Sports</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <SportCard
          title="Cricket"
          origin="16th century, England"
          history="Cricket has evolved from a village game to an international sport with formats like Test, ODI, and T20."
          rules="Teams take turns batting and bowling. The batting team scores runs; the bowling team tries to get batters out."
          equipment="Bat, ball, stumps, protective gear"
          players="11 per team"
          image={assets.Cricket}
          link="/sports/cricket"
        />
        <SportCard
          title="Football"
          origin="1863, England"
          history="Football is the world’s most popular sport and has major tournaments like FIFA World Cup, UEFA, etc."
          rules="Players (except the goalie) can’t use their hands. Score by kicking the ball into the goal."
          equipment="Football, cleats, goalposts"
          players="11 per team"
          image={assets.Football}
          link="/sports/football"
        />
        <SportCard
          title="Volleyball"
          origin="1895, USA"
          history="Invented as a mix of basketball, handball, and tennis. Now a global indoor and beach sport."
          rules="Teams hit the ball over the net in max 3 touches. Score by grounding the ball on the opponent’s side."
          equipment="Volleyball, net, court"
          players="6 per team"
          image={assets.Volleyball}
          link="/sports/volleyball"
        />
        <SportCard
          title="Netball"
          origin="1890s, England"
          history="Derived from early basketball. Played widely by women, especially in Commonwealth nations."
          rules="No dribbling. Ball must be passed within 3 seconds. Only certain players can shoot."
          equipment="Netball, ring posts"
          players="7 per team"
          image={assets.Netball}
          link="/sports/netball"
        />
        <SportCard
          title="Tennis"
          origin="Late 19th century, England"
          history="Tennis began as a game called lawn tennis and has evolved into a major international sport with singles and doubles competitions."
          rules="Players hit the ball back and forth over the net. The goal is to win points by making the ball land in the opponent's court."
          equipment="Tennis racket, tennis ball, net"
          players="1 or 2 per team"
          image={assets.Tennis}
          link="/sports/tennis"
        />
        <SportCard
          title="Badminton"
          origin="Mid-19th century, British India"
          history="Badminton developed from a game called ‘Poona’ in India and became an Olympic sport in 1992."
          rules="Players hit the shuttlecock over a net using rackets. The aim is to score points by making the shuttlecock land in the opponent’s side."
          equipment="Badminton racket, shuttlecock, net"
          players="1 or 2 per team"
          image={assets.Badminton}
          link="/sports/badminton"
        />
        <SportCard
          title="Swimming"
          origin="Ancient times, various cultures"
          history="Swimming is one of the oldest forms of exercise. It became a competitive sport in the 19th century."
          rules="Swimmers race across the pool in various styles like freestyle, backstroke, breaststroke, and butterfly."
          equipment="Swimsuit, swimming cap, goggles"
          players="1 per race"
          image={assets.Swimming}
          link="/sports/swimming"
        />
        <SportCard
          title="Basketball"
          origin="1891, USA"
          history="Invented by Dr. James Naismith, it has become one of the most popular sports globally with leagues like NBA."
          rules="Teams attempt to score by shooting the ball into the opponent’s hoop. Players can dribble, pass, and shoot."
          equipment="Basketball, hoop, court"
          players="5 per team"
          image={assets.Basketball}
          link="/sports/basketball"
        />
        <SportCard
          title="Hockey"
          origin="19th century, UK"
          history="Field hockey is a fast-paced game that originated in the UK. Ice hockey evolved from it and is popular in countries like Canada and the USA."
          rules="Teams attempt to score by hitting a ball or puck into the opponent’s goal using a stick."
          equipment="Hockey stick, ball/puck, goal"
          players="11 per team (field), 6 per team (ice)"
          image={assets.Hockey}
          link="/sports/hockey"
        />
        {/* Add more sports here as needed */}
      </div>
    </div>
  );
};

export default ExploreSports;
