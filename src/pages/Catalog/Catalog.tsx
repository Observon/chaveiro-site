import React, { useState, useMemo } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  Chip, 
  Stack,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Slider,
  Checkbox,
  FormControlLabel,
  Paper,
  IconButton,
  Collapse,
  styled,
  Theme
} from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

// Styled container for filters
const FilterContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  width: '100%',
  '& > *': {
    flex: '1 1 300px',
    minWidth: '250px',
  },
}));

// Responsive grid item component
const ResponsiveGrid = styled('div')(({ theme }: { theme: Theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gap: theme.spacing(3),
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
  },
}));

const GridItem = styled('div')({
  width: '100%',
});

// Sample data for automotive keys
const automotiveKeys = [
  {
    id: 1,
    title: 'Nissan Sentra',
    manufacturer: 'Nissan',
    type: 'Presencial',
    year: 2018,
    yearRange: '2016 - 2020',
    price: 280.00,
    formattedPrice: 'R$ 280,00',
    image: '/images/nissan-sentra-key.jpg',
    inStock: true,
  },
  {
    id: 2,
    title: 'Honda Civic',
    manufacturer: 'Honda',
    type: 'Canivete',
    year: 2017,
    yearRange: '2014 - 2019',
    price: 320.00,
    formattedPrice: 'R$ 320,00',
    image: '/images/honda-civic-key.jpg',
    inStock: true,
  },
  {
    id: 3,
    title: 'Toyota Corolla',
    manufacturer: 'Toyota',
    type: 'Chave Magnética',
    year: 2019,
    yearRange: '2017 - 2021',
    price: 350.00,
    formattedPrice: 'R$ 350,00',
    image: '/images/toyota-corolla-key.jpg',
    inStock: true,
  },
  {
    id: 4,
    title: 'Volkswagen Gol',
    manufacturer: 'Volkswagen',
    type: 'Presencial',
    year: 2015,
    yearRange: '2013 - 2017',
    price: 250.00,
    formattedPrice: 'R$ 250,00',
    image: '/images/vw-gol-key.jpg',
    inStock: true,
  },
  {
    id: 5,
    title: 'Fiat Palio',
    manufacturer: 'Fiat',
    type: 'Canivete',
    year: 2016,
    yearRange: '2014 - 2018',
    price: 230.00,
    formattedPrice: 'R$ 230,00',
    image: '/images/fiat-palio-key.jpg',
    inStock: false,
  },
  {
    id: 6,
    title: 'Chevrolet Onix',
    manufacturer: 'Chevrolet',
    type: 'Chave Magnética',
    year: 2020,
    yearRange: '2019 - 2023',
    price: 380.00,
    formattedPrice: 'R$ 380,00',
    image: '/images/chevrolet-onix-key.jpg',
    inStock: true,
  },
];

// Available manufacturers from the data
const manufacturers = Array.from(new Set(automotiveKeys.map(key => key.manufacturer))).sort();

// Available key types from the data
const keyTypes = ['Presencial', 'Canivete', 'Chave Magnética'];

// Year range for the slider
const yearRange = {
  min: Math.min(...automotiveKeys.map(key => key.year)),
  max: Math.max(...automotiveKeys.map(key => key.year))
};



const ProductCard = styled(Card)(({ theme }: { theme: Theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

const PriceTag = styled(Typography)(({ theme }: { theme: Theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 'bold',
  margin: theme.spacing(1, 0),
}));

const Catalog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>([]);
  const [selectedKeyTypes, setSelectedKeyTypes] = useState<string[]>([]);
  const [yearRangeValue, setYearRangeValue] = useState<number[]>([yearRange.min, yearRange.max]);

  const [inStockOnly, setInStockOnly] = useState(false);
  const [filtersExpanded, setFiltersExpanded] = useState(false);

  // Handle manufacturer selection
  const handleManufacturerChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setSelectedManufacturers(typeof value === 'string' ? value.split(',') : value);
  };

  // Handle key type selection
  const handleKeyTypeChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setSelectedKeyTypes(typeof value === 'string' ? value.split(',') : value);
  };

  // Handle year range change
  const handleYearRangeChange = (event: Event, newValue: number | number[]) => {
    setYearRangeValue(newValue as number[]);
  };


  // Filter the keys based on selected filters
  const filteredKeys = useMemo(() => {
    return automotiveKeys.filter(key => {
      const searchMatch = key.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           key.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
      
      const manufacturerMatch = selectedManufacturers.length === 0 || 
                                 selectedManufacturers.includes(key.manufacturer);
      
      const keyTypeMatch = selectedKeyTypes.length === 0 || 
                            selectedKeyTypes.includes(key.type);
      
      const yearMatch = key.year >= yearRangeValue[0] && 
                              key.year <= yearRangeValue[1];
      
      const stockMatch = !inStockOnly || key.inStock;

      return searchMatch && manufacturerMatch && keyTypeMatch && yearMatch && stockMatch;
    });
  }, [searchTerm, selectedManufacturers, selectedKeyTypes, yearRangeValue, inStockOnly]);

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedManufacturers([]);
    setSelectedKeyTypes([]);
    setYearRangeValue([yearRange.min, yearRange.max]);

    setInStockOnly(false);
  };

  return (
    <Box component="main" sx={{ py: 6, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          component="h1" 
          align="center" 
          gutterBottom
          sx={{
            fontWeight: 'bold',
            mb: 3,
            position: 'relative',
            '&::after': {
              content: '""',
              display: 'block',
              width: '80px',
              height: '4px',
              backgroundColor: 'primary.main',
              margin: '20px auto 0',
              borderRadius: '2px',
            },
          }}
        >
          Chaves Automotivas
        </Typography>

        {/* Search and Filter Section */}
        <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Filtros</Typography>
            <IconButton onClick={() => setFiltersExpanded(!filtersExpanded)}>
              {filtersExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
          
          <Collapse in={filtersExpanded}>
            <FilterContainer>
              {/* Search Field */}
              <Box sx={{ flex: '2 1 400px' }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Buscar por modelo ou fabricante..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              {/* Manufacturer Filter */}
              <Box>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Fabricante</InputLabel>
                  <Select
                    multiple
                    value={selectedManufacturers}
                    onChange={handleManufacturerChange}
                    label="Fabricante"
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} size="small" />
                        ))}
                      </Box>
                    )}
                  >
                    {manufacturers.map((manufacturer) => (
                      <MenuItem key={manufacturer} value={manufacturer}>
                        <Checkbox checked={selectedManufacturers.indexOf(manufacturer) > -1} />
                        {manufacturer}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {/* Key Type Filter */}
              <Box>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Tipo de Chave</InputLabel>
                  <Select
                    multiple
                    value={selectedKeyTypes}
                    onChange={handleKeyTypeChange}
                    label="Tipo de Chave"
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} size="small" />
                        ))}
                      </Box>
                    )}
                  >
                    {keyTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        <Checkbox checked={selectedKeyTypes.indexOf(type) > -1} />
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {/* Year Range Filter */}
              <Box sx={{ flex: '2 1 400px' }}>
                <Box>
                  <Typography gutterBottom>Ano do Veículo: {yearRangeValue[0]} - {yearRangeValue[1]}</Typography>
                  <Slider
                    value={yearRangeValue}
                    onChange={handleYearRangeChange}
                    valueLabelDisplay="auto"
                    min={yearRange.min}
                    max={yearRange.max}
                    step={1}
                  />
                </Box>
              </Box>



              {/* Stock Filter */}
              <Box sx={{ flex: '1 1 100%' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Mostrar apenas itens em estoque"
                />
              </Box>

              {/* Clear Filters Button */}
              <Box sx={{ flex: '1 1 100%' }}>
                <Button 
                  variant="outlined" 
                  onClick={resetFilters}
                  startIcon={<FilterListIcon />}
                >
                  Limpar Filtros
                </Button>
              </Box>
            </FilterContainer>
          </Collapse>
        </Paper>
        
        {/* Results Count */}
        <Typography variant="subtitle1" sx={{ mb: 3, color: 'text.secondary' }}>
          {filteredKeys.length} {filteredKeys.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
        </Typography>
        
        {/* Product Grid */}
        <Box sx={{ width: '100%' }}>
          <ResponsiveGrid>
          {filteredKeys.map((key) => (
            <GridItem key={key.id}>
              <ProductCard elevation={3}>
                <CardMedia
                  component="img"
                  height="200"
                  image={key.image}
                  alt={key.title}
                  sx={{ objectFit: 'contain', p: 2, bgcolor: '#f5f5f5' }}
                />
                <CardContent>
                  <Typography variant="h6" component="h2" align="center" gutterBottom>
                    {key.title}
                  </Typography>
                  
                  <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 2 }}>
                    <Chip 
                      label={key.type} 
                      size="small" 
                      color="primary" 
                      variant="outlined" 
                    />
                    <Chip 
                      label={key.year} 
                      size="small" 
                      color="secondary" 
                      variant="outlined" 
                    />
                  </Stack>
                  
                  <PriceTag align="center">
                    {key.formattedPrice}
                  </PriceTag>
                  
                  <Button
                    fullWidth
                    variant="contained"
                    color="success"
                    startIcon={<WhatsAppIcon />}
                    href="https://wa.me/5521998063214?text=Olá! Gostaria de mais informações sobre a chave do meu veículo."
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      mt: 2,
                      backgroundColor: '#25D366',
                      '&:hover': {
                        backgroundColor: '#128C7E',
                      },
                      fontWeight: 'bold',
                    }}
                  >
                    Solicitar Orçamento
                  </Button>
                </CardContent>
              </ProductCard>
            </GridItem>
          ))}
            </ResponsiveGrid>
        </Box>
      </Container>
    </Box>
  );
};

export default Catalog;
