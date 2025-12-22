import { useEffect, useState } from "react";
import { useAuth } from "../provider/AuthProvider";
import axios from "axios";

const useRole = () => {
  const { user, loading } = useAuth();
  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios.get(`https://blood-donation-backentd-11.vercel.app/users/role/${user.email}`)
        .then(res => {
          setRole(res.data?.role);
          setRoleLoading(false);
        });
    }
  }, [user]);

  return [role, roleLoading];
};

export default useRole;