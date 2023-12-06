import Person from "./Person";

const List = ({ people }) => {
  return (
    <section>
      {people.map((person, index) => {
        return <Person key={index} {...person} />;
      })}
    </section>
  );
};
export default List;
