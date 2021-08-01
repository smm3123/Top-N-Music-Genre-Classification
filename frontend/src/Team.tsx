const members = [
  {
    id: 0,
    name: 'Janet Anderson',
    github: 'https://github.com/ja-osu',
    blurb: 'blah blah blah',
  },
  {
    id: 1,
    name: 'Andrew Brown',
    github: 'https://github.com/ahb37',
    blurb: 'blah blah blah',
  },
  {
    id: 2,
    name: 'Syed Mahdi',
    github: 'https://github.com/smm3123',
    blurb: 'blah blah blah',
  },
  {
    id: 3,
    name: 'Andy Tran',
    github: 'https://github.com/tran-dy',
    blurb: 'blah blah blah',
  },
];

const Team: React.FC = () => {
  return (
    <div className="team">
      <h1>The Team</h1>
      <p>Team page - will have team members/role descriptions/etc.</p>
      <ul>
        {members.map((person) => (
          <li key={person.id}>
            {person.name}
            <p>{person.github}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Team;
