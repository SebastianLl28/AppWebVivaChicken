import { Box, Grid, Paper, styled } from '@mui/material'
import React from 'react'
import { Element } from './Element'

export const Header = () => {
  return (
    <Grid container spacing={2}>
      <Element xs={3} cantidad={15} title="Clientes"/>
      <Element xs={3} cantidad={1} title="Locales"/>
      <Element xs={3} cantidad={2} title="Trabajadores"/>
      <Element xs={3} cantidad={`$0`} title="Ventas"/>
    </Grid>
  )
}
