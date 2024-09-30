import { setJobRecommendations } from "@/redux/jobSlice"; // Ensure you have this action defined
import { JOB_RECOMMENDATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetJobRecommendations = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // const fetchJobRecommendations = async () => {
    //   try {
    //     const res = await axios.get(
    //       `${JOB_RECOMMENDATION_API_END_POINT}/recommendations`,
    //       {
    //         withCredentials: true,
    //       }
    //     );
    //     console.log(res.data);
    //     if (res.data.success) {
    //       dispatch(setJobRecommendations(res.data.jobRecommendations));
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    const fetchJobRecommendations = async () => {
      try {
        const res = await axios.get(
          `${JOB_RECOMMENDATION_API_END_POINT}/recommendations`,
          {
            withCredentials: true,
          }
        );

        console.log(res.data); // Check what data is being returned

        if (res.data.success) {
          // Ensure that you are using the correct key from the response
          dispatch(setJobRecommendations(res.data.recommendations)); // Update this line if necessary
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchJobRecommendations();
  }, [dispatch]);
};

export default useGetJobRecommendations;
