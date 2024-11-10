import Banner from "./Banner";

const Item = ({ name, quantity, price }) => {
    return (
        <tr>
            <td className="border">{name}</td>
            <td className="border">{quantity}</td>
            <td className="border ">${price}</td>
            <td className="border ">
                <form className="flex justify-around">
                    <input
                        type="number"
                        name="quantity"
                        className="border border-black mr-2"
                    />
                    <input
                        type="submit"
                        value="purchase"
                        className="rounded-xl bg-emerald-500 px-5 hover:cursor-pointer text-white"
                    />
                </form>
            </td>
        </tr>
    );
};

const Inventory = () => {
    return (
        <div className="w-screen h-full">
            <Banner employee={true} />
            <div className="font-bold text-3xl">Store inventory</div>
            <div className="flex justify-center my-5">
                <table className="w-4/5 bg-white">
                    <thead>
                        <tr>
                            <th className="border font-bold text-center">
                                Item
                            </th>
                            <th className="border text-center">Quantity</th>
                            <th className="border text-center">Price</th>
                            <th className="border text-center">Add items</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Item name="Pizza" quantity={10} price={10.99} />
                        <Item name="Soda" quantity={10} price={1.99} />
                        <Item name="Garlic Knots" quantity={10} price={5.99} />
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Inventory;
