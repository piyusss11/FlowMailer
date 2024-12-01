import { useEffect, useState } from "react";
import axios from "axios";
interface Iuser {
  email: string;
  name: string;
  passwornd?: string;
}
const useGetUser = () => {
  const [user, setUser] = useState<Iuser>();

  const getUser = async () => {
    try {
      const user = await axios.get(
        `${import.meta.env.VITE_LocalHost}/api/v1/auth/getUser`,
        {
          withCredentials: true,
        }
      );
      setUser(user.data);
      console.log(user.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUser();
  },[user]);
  return user;
};

export default useGetUser;
