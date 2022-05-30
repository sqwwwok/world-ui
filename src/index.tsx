import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import './index.less';

interface PlayerInfo {
  name: string;
  portrait: string;
  time: number;
  proficiency: {
    skill: string;
    degree: number;
  }[];
  possessions: Possession[];
}

interface Possession {
  name: string;
  durability: number;
}

enum LoginStatus {
  loading,
  notLogin,
  login,
}

enum Content {
  universe,
  planet,
  land,
  warehouse,
  market,
}

const App = () => {
  const [isLogin, setIsLogin] = useState<LoginStatus>(LoginStatus.loading);
  const [content, setContent] = useState<Content>(Content.universe);

  function checkLogin(): Promise<void> {
    return Promise.resolve();
  }

  function getPlayerInfo(): Promise<PlayerInfo> {
    const mockPlayerInfo = {
      name: 'sqwww',
      time: 0,
      portrait: '//ae01.alicdn.com/kf/Hf768b4fa794e44bfb7cc86e4a528a035h.png',
      possessions: [],
      proficiency: [],
    };

    return Promise.resolve(mockPlayerInfo);
  }

  function renderContent() {
    switch (content) {
      case Content.universe:
        return;
        break;

      default:
        break;
    }
  }

  useEffect(() => {
    checkLogin().then(() => {
      setIsLogin(LoginStatus.login);
    });
  }, []);

  return (
    <div className="main">
      <div className="profile">
        <img src="" alt="" className="portrait" />
        <div className="infoWrapper">
          <div className="name"></div>
          <div className="time"></div>
        </div>
      </div>
      <div className="content"></div>
      <div className="tabbar">
        <button className="tab" onclick={() => setContent(Content.planet)}>
          Resource
        </button>
        <button className="tab" onclick={() => setContent(Content.warehouse)}>
          Warehouse
        </button>
        <button className="tab" onclick={() => setContent(Content.market)}>
          Market
        </button>
      </div>
    </div>
  );
};

function Universe({ planets }: { planets: string[] }) {
  return (
    <table>
      {planets.map((planetName) => {
        <tr>
          <td>{planetName}</td>
        </tr>;
      })}
    </table>
  );
}

function Planet({ planetName }: { planetName: string }) {
  const [lands, setLands] = useState<LandInfo>({});

  useEffect(() => {
    getPlanetInfo().then((planetInfo) => setLands(planetInfo.lands));
  }, []);

  interface LandInfo {
    name: string;
    data: string[];
  }

  interface PlanetInfo {
    lands: LandInfo[];
  }

  function getPlanetInfo(): Promise<PlanetInfo> {
    return Promise.resolve({
      lands: [
        {
          name: '0x1234',
          data: new Array(25).fill('#123fff'),
        },
      ],
    });
  }

  return (
    <div className="planetMain">
      {lands.map(({ name, data }) => (
        <Land size="small" name={name} data={data} />
      ))}
    </div>
  );
}

function Land({
  size,
  name,
  data,
}: {
  size: 'small' | 'big';
  name: string;
  data: string[];
}) {
  return (
    <div>
      <p>{name}</p>
      <div className={size === 'small' ? 'land small' : 'land big'}>
        {data.map((color) => (
          <div
            style={{
              backgroundColor: color,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

function Warehouse() {}

function Market() {}

ReactDOM.render(<App />, document.getElementById('root'));
