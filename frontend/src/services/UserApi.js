import { getJwt,setJwt } from './../utils/JwtHandler';

const BaseUrl = "http://localhost:5000/api";

export const UserLogin = async (username, password) => {
    try {
      const response = await fetch(`${BaseUrl}/Users/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`, {
        method: 'POST'
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      setJwt(await response.text());
      return true;

    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  export const UserRegister = async (username, password) => {
    try {
      const response = await fetch(`${BaseUrl}/Users/register?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`, {
        method: 'POST'
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      return true;
      
    } catch (error) {
      console.error("Error during register:", error);
      throw error;
    }
  };