import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    title: {
        fontWeight: 'bold', 
        textAlign: 'center',
        marginBottom: '20px'
    },
    text: {
        fontWeight: 'bold'
    },
    container: {
        marginBottom: '100px'
    }
}));

export default useStyles;