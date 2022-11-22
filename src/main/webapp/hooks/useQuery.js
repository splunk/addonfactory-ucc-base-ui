import { useNavigate } from 'react-router-dom';

// A custom hook that builds on useLocation to parse the query string for you.
function useQuery() {
    return new URLSearchParams(useNavigate().search);
}

export default useQuery;
