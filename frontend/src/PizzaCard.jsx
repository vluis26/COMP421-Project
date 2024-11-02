import cartoonPizza from "./assets/cartoon_pizza.png";
const PizzaCard = ({ name, ingredients }) => {
    return (
        <div className="shadow-md rounded-xl p-10 bg-slate-100">
            <img src={cartoonPizza} className="w-64" />
            <p className="font-bold text-3xl">{name}</p>
            Ingredients:
            <span className="italic">{ingredients}</span>
        </div>
    );
};
export default PizzaCard;
