import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import truncate from 'lodash.truncate'

import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { BookDefault } from '@/types/interfaces';

import { ItemsList, ListItem } from '@/components/ui/ItemsList';
import { BookActions } from '@/components/commons/BookActions';
import styles from './styles.module.css';
import { Loader } from '@/utils/loader';
import { Card } from '@/components/ui/Card';

interface ResultsListProps{
   results: BookDefault[];
   resLoading?: boolean;
   noDescription?: boolean;
}

export const ResultsList: React.FC<ResultsListProps> = ({results, resLoading, noDescription}) => {

   return (
         <ItemsList>
            <Loader isLoading={resLoading!!}>
               {results?.length > 0 && results?.map(({id, volumeInfo, ...restInfo}) => { 
                  if(!id) return null;
                  const coverImage = volumeInfo.imageLinks?.thumbnail;
                  const descrFragment = truncate(volumeInfo.description, {
                     length: 300,
                     separator: /,? +/,
                  });
                  const titleFragment = truncate(volumeInfo.title, {
                     length: 80,
                     separator: /,? +/,
                  });
                  const book = {
                     id, 
                     volumeInfo,
                     ...restInfo 
                  };
                  
                  return(
                     <ListItem
                        key={id} 
                        noDivider
                        className={styles.book_list_item}
                     >
                        <Card>
                           {coverImage ?
                              <Image
                                 src={coverImage}  
                                 width={140}
                                 className={styles.book_list_item_img}
                                 height={190}
                                 alt='okładka'
                              /> :
                              <div className={styles.cover_replace}>Podgląd niedostępny</div>}
                           <CardContent sx={{flexGrow: 1}}>
                              <Typography 
                                 gutterBottom variant="h5" 
                                 component="div"
                                 sx={{ 
                                    display: "flex",
                                    flexDirection: "column",
                                    fontSize: "1.2rem"
                                 }}
                              >
                                 <Link className={styles.book_title_link} href={`/book/${id}`}>{titleFragment}</Link>
                                 <span className={styles.book_authors}>{volumeInfo.authors?.slice(0, 2).join(",")}</span>
                              </Typography>   
                              <Typography variant="body2" color="text.secondary">
                                 <Box>{volumeInfo.subtitle}</Box>
                                 {noDescription ? null : <Box>{descrFragment}</Box>}
                              </Typography>
                           </CardContent>
                           <CardActions sx={{flexDirection: "column"}}>
                           {book &&
                              <BookActions
                                 className={styles.search_list_actions}
                                 book={book}
                              />}
                           </CardActions>
                     </Card>
               </ListItem>
                  )}
               ) }
            </Loader>
         </ItemsList>
   )
   
}

