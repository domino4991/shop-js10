import {Link} from "react-router-dom";
import {Card, CardActions, CardContent, CardHeader, Grid, IconButton, Typography} from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const ProductItem = ({title, price, id}) => {
  return (
    <Grid item xs={12} sm={6} md={6} lg={4}>
      <Card>
        <CardHeader title={title}/>
        <CardContent>
          <Typography variant="subtitle1">
            {price} KGS
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton component={Link} to={'/products/' + id}>
            <ArrowForwardIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductItem;