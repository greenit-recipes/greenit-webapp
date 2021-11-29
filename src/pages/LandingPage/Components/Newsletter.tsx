import { Container, Button, Grid } from "../../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface Newsletter {
}
  
export const Newsletter: React.FC<Newsletter> = ({}) => {
    const schema = yup.object().shape({
        email: yup.string().email().required("L'email est obligatoire."),
      }); // _ - .
    const onSubmitHandler = (data: { email: string; }) => {
        console.log(data)
    };
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    return (

        <Container
        className="w-full md:w-3/5 h-full mt-26"
        margin={20}
        itemsCenter
        >

            <h1 className="text-xl md:text-2xl | text-center whitespace-pre-line">
                Inscris toi à la newsletter pour découvrir des astuces DIY
                {"\n"} et être au courant des nouvelles recettes !
            </h1>

            <form
                className="md:flex p-6"
                onSubmit={handleSubmit(onSubmitHandler)}
            >

                <input
                    className="shadow-lg rounded-lg h-12 w-full px-3 text-gray-700 min-w-18 | focus:outline-none focus:shadow-outline"
                    id="email"
                    placeholder="Ton email"
                    type="email"
                    {...register("email")}
                ></input>
            
                <div className="grid w-full justify-items-center mt-4 md:mt-0 md:ml-4">
                    <Button type="green" className="w-32">
                        Rejoindre
                    </Button>
                </div>
                <div>
                    <p className="text-red-500 text-xs italic">{errors.email?.message}</p>
                </div>
            </form>

            <div className="w-3/4 mb-20 text-xs md:text-sm text-center lg:mx-80">
                Nous utilisons cette newsletter uniquement pour garder notre communauté
                informée des évolutions de Greenit ainsi que pour connaître vos avis
                sur certaines décisions. Vous pouvez vous désinscrire
                à tout moment en nous contactant à hello@greenitcommunity.com
            </div>
            
        </Container>
    );
};