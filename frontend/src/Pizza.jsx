import { ArrowRight } from "lucide-react";
const Pizza = ({ name, ingredients }) => {
    return (
        <div className=" shadow-xl rounded-xl p-5 flex items-center justify-between hover:cursor-pointer w-96 bg-slate-50 m-3">
            <div>
                <p className="font-bold text-lg p-2">{name}</p>
                <p className=" italic pl-3">{ingredients}</p>
            </div>
            <div className="items-center">
                <ArrowRight />
            </div>
        </div>
    );
};
export default Pizza;
