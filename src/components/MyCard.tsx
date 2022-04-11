import React, { FC } from "react";

import {CardMedia, CardContent, Typography, IconButton} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Card from '@mui/material/Card';
import { Characters } from "../models/Character";


type MyCardProps = {
  name:string, 
  image:string, 
  toggleFavorite: (char: Characters) => void,
  isFavorite: boolean,
  character: Characters
}

const MyCard: FC<MyCardProps> = (props:MyCardProps) => {

    const {name, image, toggleFavorite, isFavorite, character} = props;

    return(
      <Card>
          <CardMedia
            component="img"
            width="300px"
            image={image}
          />

          <CardContent>  
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
          </CardContent>

          <IconButton  onClick={() => toggleFavorite(character)} aria-label="add to favorites">
            <FavoriteIcon style={{color: isFavorite ? "red" : "lightgray" }}  />
          </IconButton>
      </Card>
  
    )
}

export default MyCard