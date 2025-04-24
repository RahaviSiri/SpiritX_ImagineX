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
          image= {assets.Cricket}
          link="/sports/cricket"
        />
        <SportCard
          title="Football"
          origin="1863, England"
          history="Football is the world’s most popular sport and has major tournaments like FIFA World Cup, UEFA, etc."
          rules="Players (except the goalie) can’t use their hands. Score by kicking the ball into the goal."
          equipment="Football, cleats, goalposts"
          players="11 per team"
          image= {assets.Football}
          link="/sports/football"
        />
        <SportCard
          title="Volleyball"
          origin="1895, USA"
          history="Invented as a mix of basketball, handball, and tennis. Now a global indoor and beach sport."
          rules="Teams hit the ball over the net in max 3 touches. Score by grounding the ball on the opponent’s side."
          equipment="Volleyball, net, court"
          players="6 per team"
          image= {assets.Volleyball}
          link="/sports/volleyball"
        />
        <SportCard
          title="Netball"
          origin="1890s, England"
          history="Derived from early basketball. Played widely by women, especially in Commonwealth nations."
          rules="No dribbling. Ball must be passed within 3 seconds. Only certain players can shoot."
          equipment="Netball, ring posts"
          players="7 per team"
          image= {assets.Netball}
          link="/sports/netball"
        />
        {/* Add more sports here as needed */}
      </div>
    </div>
  );
};

export default ExploreSports;
