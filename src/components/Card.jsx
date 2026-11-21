export const Card = ({ info }) => {
  return (
    <div className="card">
      <h2>
        {info.name} | #{info.id}
      </h2>
      <h2>Tipo: {info?.types.map((t) => t.type.name).join(", ")}</h2>
      <img src={info?.sprites.front_default} alt={info?.name} width="150px" />
    </div>
  );
};
