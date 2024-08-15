import React, { useState } from 'react';

const factions = {
  'Space Marines': [
    'Space Marines',
    'Black Templars',
    'Blood Angels',
    'Dark Angels',
    'Deathwatch',
    'Grey Knights',
    'Space Wolves',
  ],
  'Armies of the Imperium': [
    'Adepta Sororitas',
    'Adeptus Custodes',
    'Adeptus Mechanicus',
    'Astra Militarum',
  ],
  'Forces of Chaos': [
    'Chaos Space Marines',
    'Death Guard',
    'Thousand Sons',
    'World Eaters',
    'Chaos Daemons',
  ],
  'The Xenos Threat': [
    'Aeldari',
    'Drukhari',
    'Tyranids',
    'Genestealer Cults',
    'Leagues of Votann',
    'Necrons',
    'Orks',
    'T\'au Empire',
  ],
};

function Sidebar({ onArmySelect }) {
  const [openFaction, setOpenFaction] = useState(null);

  const toggleFaction = (faction) => {
    setOpenFaction(openFaction === faction ? null : faction);
  };

  return (
    <div className="sidebar">
      <h3
        onClick={() => onArmySelect('')} // Reset filter to show all products
        className="faction-title"
        style={{ cursor: 'pointer' }}
      >
        All Armies
      </h3>
      {Object.keys(factions).map((faction) => (
        <div key={faction}>
          <h3 onClick={() => toggleFaction(faction)} className="faction-title">
            {faction}
          </h3>
          {openFaction === faction && (
            <ul className="army-list">
              {factions[faction].map((army) => (
                <li
                  key={army}
                  onClick={() => onArmySelect(army)} // Trigger filtering when an army is selected
                  className="army-item"
                  style={{ cursor: 'pointer' }} // Make the items visually interactive
                >
                  {army}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
