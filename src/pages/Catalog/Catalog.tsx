import React, { useState, useMemo, useEffect } from 'react';
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
  Checkbox,
  FormControlLabel,
  Paper,
  IconButton,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
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

type KeyOption = {
  id: number;
  name: string;
};

type AutomotiveKey = {
  id: number;
  title: string;
  manufacturer: string;
  type: string;
  year: number;
  yearRange: string;
  price: number;
  formattedPrice: string;
  image: string;
  inStock: boolean;
};

const DEFAULT_API_BASE_URL = 'http://127.0.0.1:8000/api';

const getApiBaseUrl = () => {
  const configuredApiBaseUrl = process.env.REACT_APP_API_BASE_URL?.trim();
  const apiBaseUrl = configuredApiBaseUrl || DEFAULT_API_BASE_URL;

  try {
    const parsedUrl = new URL(apiBaseUrl);

    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      throw new Error('REACT_APP_API_BASE_URL must be an absolute HTTP(S) URL.');
    }

    return apiBaseUrl;
  } catch (error) {
    throw new Error(`Invalid REACT_APP_API_BASE_URL "${apiBaseUrl}". Expected an absolute HTTP(S) URL.`);
  }
};

const API_BASE_URL = getApiBaseUrl();

const defaultYearRange = {
  min: 2000,
  max: new Date().getFullYear(),
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

type CatalogQuestionnaire = {
  keySituation: string;
  vehicleYearModel: string;
  keyProfile: string;
  alarmOriginal: string;
  notes: string;
};

const initialQuestionnaire: CatalogQuestionnaire = {
  keySituation: '',
  vehicleYearModel: '',
  keyProfile: '',
  alarmOriginal: '',
  notes: '',
};

const keyTypeVisualHints = [
  {
    title: 'Chave simples',
    value: 'Chave simples (sem telecomando)',
    description: 'Somente a lâmina da chave, sem botões para abrir/travar.',
    image: '/images/chaves/automotivas/chave-simples.svg',
  },
  {
    title: 'Chave canivete',
    value: 'Chave com telecomando canivete',
    description: 'Possui botões e a lâmina recolhe dentro do corpo da chave.',
    image: '/images/chaves/automotivas/chave-canivete.svg',
  },
  {
    title: 'Chave presencial',
    value: 'Chave presencial (de presença)',
    description: 'Modelo de presença (keyless), normalmente usado por aproximação.',
    image: '/images/chaves/automotivas/chave-presencial.svg',
  },
  {
    title: 'Chave fura bolso',
    value: 'Chave com telecomando não canivete (fura bolso)',
    description: 'Controle com botões, mas sem lâmina retrátil (formato tradicional).',
    image: '/images/chaves/automotivas/chave-fura-bolso.svg',
  },
  {
    title: 'Telecomando separado',
    value: 'Telecomando separado da chave (tipo chaveiro)',
    description: 'A chave fica separada do controle remoto (tipo chaveiro).',
    image: '/images/chaves/automotivas/telecomando-separado.svg',
  },
];

const buildCatalogWhatsAppMessage = (key: AutomotiveKey, questionnaire: CatalogQuestionnaire) => {
  const optionalAnswers: string[] = [];

  if (questionnaire.keySituation.trim()) {
    optionalAnswers.push(`• Situação da chave: ${questionnaire.keySituation}`);
  }

  if (questionnaire.vehicleYearModel.trim()) {
    optionalAnswers.push(`• Ano/versão informado: ${questionnaire.vehicleYearModel}`);
  }

  if (questionnaire.keyProfile.trim()) {
    optionalAnswers.push(`• Tipo de chave atual: ${questionnaire.keyProfile}`);
  }

  if (questionnaire.alarmOriginal.trim()) {
    optionalAnswers.push(`• Alarme original de fábrica: ${questionnaire.alarmOriginal}`);
  }

  if (questionnaire.notes.trim()) {
    optionalAnswers.push(`• Observações do cliente: ${questionnaire.notes.trim()}`);
  }

  const message = [
    'Olá! Vim pelo catálogo e quero orçamento para esta chave:',
    '',
    `• Modelo selecionado: ${key.title}`,
    `• Marca: ${key.manufacturer}`,
    `• Tipo da chave no catálogo: ${key.type}`,
    `• Ano de referência: ${key.year} (faixa ${key.yearRange})`,
    `• Valor de referência: ${key.formattedPrice}`,
    '',
    optionalAnswers.length > 0 ? 'Informações adicionais (opcional):' : 'Informações adicionais: cliente preferiu informar no atendimento.',
    ...optionalAnswers,
    '',
  ].join('\n');

  return `https://wa.me/5521998063214?text=${encodeURIComponent(message)}`;
};

const Catalog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [keys, setKeys] = useState<AutomotiveKey[]>([]);
  const [manufacturers, setManufacturers] = useState<string[]>([]);
  const [keyTypes, setKeyTypes] = useState<string[]>([]);
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>([]);
  const [selectedKeyTypes, setSelectedKeyTypes] = useState<string[]>([]);
  const [yearRangeBounds] = useState(defaultYearRange);
  const [yearRangeValue, setYearRangeValue] = useState<number[]>([defaultYearRange.min, defaultYearRange.max]);

  const [inStockOnly, setInStockOnly] = useState(false);
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [questionnaireOpen, setQuestionnaireOpen] = useState(false);
  const [selectedKeyForContact, setSelectedKeyForContact] = useState<AutomotiveKey | null>(null);
  const [questionnaire, setQuestionnaire] = useState<CatalogQuestionnaire>(initialQuestionnaire);

  const yearOptions = useMemo(() => {
    const size = yearRangeBounds.max - yearRangeBounds.min + 1;
    return Array.from({ length: size }, (_, index) => yearRangeBounds.max - index);
  }, [yearRangeBounds]);

  useEffect(() => {
    const debounceTimer = window.setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 400);

    return () => {
      window.clearTimeout(debounceTimer);
    };
  }, [searchTerm]);

  useEffect(() => {
    let disposed = false;

    const loadInitialData = async () => {
      setIsBootstrapping(true);
      setErrorMessage(null);

      try {
        const [manufacturersResponse, keyTypesResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/manufacturers`),
          fetch(`${API_BASE_URL}/key-types`),
        ]);

        if (!manufacturersResponse.ok || !keyTypesResponse.ok) {
          throw new Error('Não foi possível carregar os dados iniciais do catálogo.');
        }

        const [manufacturerData, keyTypeData] = await Promise.all([
          manufacturersResponse.json() as Promise<KeyOption[]>,
          keyTypesResponse.json() as Promise<KeyOption[]>,
        ]);

        if (disposed) return;

        setManufacturers(manufacturerData.map((item) => item.name).sort((a, b) => a.localeCompare(b)));
        setKeyTypes(keyTypeData.map((item) => item.name));

        setIsInitialized(true);
      } catch (error) {
        if (disposed) return;
        setErrorMessage('Falha ao carregar o catálogo. Verifique se a API está em execução.');
      } finally {
        if (!disposed) {
          setIsBootstrapping(false);
        }
      }
    };

    loadInitialData();

    return () => {
      disposed = true;
    };
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    const controller = new AbortController();

    const loadFilteredKeys = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const params = new URLSearchParams();

        if (debouncedSearchTerm.trim()) {
          params.set('search', debouncedSearchTerm.trim());
        }

        selectedManufacturers.forEach((manufacturer) => {
          params.append('manufacturer', manufacturer);
        });

        selectedKeyTypes.forEach((keyType) => {
          params.append('key_type', keyType);
        });

        params.set('year_from', String(yearRangeValue[0]));
        params.set('year_to', String(yearRangeValue[1]));

        if (inStockOnly) {
          params.set('in_stock', 'true');
        }

        const endpoint = `${API_BASE_URL}/keys${params.toString() ? `?${params.toString()}` : ''}`;
        const response = await fetch(endpoint, { signal: controller.signal });

        if (!response.ok) {
          throw new Error('Não foi possível aplicar os filtros.');
        }

        const data = await response.json() as AutomotiveKey[];
        setKeys(data);
      } catch (error) {
        if ((error as DOMException).name === 'AbortError') return;
        setErrorMessage('Não foi possível atualizar os filtros do catálogo.');
      } finally {
        setIsLoading(false);
      }
    };

    loadFilteredKeys();

    return () => {
      controller.abort();
    };
  }, [debouncedSearchTerm, selectedManufacturers, selectedKeyTypes, yearRangeValue, inStockOnly, isInitialized]);

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

  const handleYearFromChange = (event: SelectChangeEvent<string>) => {
    const selectedFromYear = Number(event.target.value);

    setYearRangeValue(([currentFromYear, currentToYear]) => {
      const nextFromYear = Number.isNaN(selectedFromYear) ? currentFromYear : selectedFromYear;
      return [nextFromYear, Math.max(nextFromYear, currentToYear)];
    });
  };

  const handleYearToChange = (event: SelectChangeEvent<string>) => {
    const selectedToYear = Number(event.target.value);

    setYearRangeValue(([currentFromYear, currentToYear]) => {
      const nextToYear = Number.isNaN(selectedToYear) ? currentToYear : selectedToYear;
      return [Math.min(currentFromYear, nextToYear), nextToYear];
    });
  };
  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedManufacturers([]);
    setSelectedKeyTypes([]);
    setYearRangeValue([yearRangeBounds.min, yearRangeBounds.max]);

    setInStockOnly(false);
  };

  const handleOpenQuestionnaire = (key: AutomotiveKey) => {
    setSelectedKeyForContact(key);
    setQuestionnaire(initialQuestionnaire);
    setQuestionnaireOpen(true);
  };

  const handleCloseQuestionnaire = () => {
    setQuestionnaireOpen(false);
    setSelectedKeyForContact(null);
  };

  const handleQuestionnaireSelectChange = (field: 'keySituation' | 'keyProfile' | 'alarmOriginal') =>
    (event: SelectChangeEvent<string>) => {
      setQuestionnaire((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleQuestionnaireTextChange = (field: 'vehicleYearModel' | 'notes') =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuestionnaire((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSendToWhatsApp = () => {
    if (!selectedKeyForContact) return;

    const whatsappUrl = buildCatalogWhatsAppMessage(selectedKeyForContact, questionnaire);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    handleCloseQuestionnaire();
  };

  const handleVisualKeyTypeSelect = (value: string) => {
    setQuestionnaire((prev) => ({ ...prev, keyProfile: value }));
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
                <Typography sx={{ mb: 1 }}>Ano do veículo</Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <FormControl fullWidth>
                    <InputLabel>De</InputLabel>
                    <Select
                      value={String(yearRangeValue[0])}
                      label="De"
                      onChange={handleYearFromChange}
                    >
                      {yearOptions.map((year) => (
                        <MenuItem key={`from-${year}`} value={String(year)}>
                          {year}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel>Até</InputLabel>
                    <Select
                      value={String(yearRangeValue[1])}
                      label="Até"
                      onChange={handleYearToChange}
                    >
                      {yearOptions.map((year) => (
                        <MenuItem key={`to-${year}`} value={String(year)}>
                          {year}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  Intervalo selecionado: {yearRangeValue[0]} até {yearRangeValue[1]}
                </Typography>
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

        {errorMessage && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errorMessage}
          </Alert>
        )}

        {(isBootstrapping || isLoading) && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <CircularProgress />
          </Box>
        )}
        
        {/* Results Count */}
        <Typography variant="subtitle1" sx={{ mb: 3, color: 'text.secondary' }}>
          {keys.length} {keys.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
        </Typography>
        
        {/* Product Grid */}
        <Box sx={{ width: '100%' }}>
          <ResponsiveGrid>
          {keys.map((key) => (
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
                  
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                    sx={{
                      mb: 2,
                      flexWrap: 'wrap',
                      rowGap: 1,
                    }}
                  >
                    <Chip 
                      label={key.type} 
                      size="small" 
                      color="primary" 
                      variant="outlined"
                      sx={{
                        height: 'auto',
                        maxWidth: '100%',
                        '& .MuiChip-label': {
                          whiteSpace: 'normal',
                          display: 'block',
                          textAlign: 'center',
                          py: 0.5,
                        },
                      }}
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
                    onClick={() => handleOpenQuestionnaire(key)}
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

      <Dialog open={questionnaireOpen} onClose={handleCloseQuestionnaire} fullWidth maxWidth="sm">
        <DialogTitle>Antes de enviar ao WhatsApp</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Essas respostas são opcionais e ajudam a agilizar seu atendimento.
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Situação da chave</InputLabel>
              <Select
                value={questionnaire.keySituation}
                label="Situação da chave"
                onChange={handleQuestionnaireSelectChange('keySituation')}
              >
                <MenuItem value="">Prefiro informar no atendimento</MenuItem>
                <MenuItem value="Tenho uma chave funcionando e quero cópia">Tenho uma chave funcionando e quero cópia</MenuItem>
                <MenuItem value="Perdi todas as chaves">Perdi todas as chaves</MenuItem>
                <MenuItem value="Não tenho certeza">Não tenho certeza</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Ano e versão do veículo (opcional)"
              placeholder="Ex.: 2018 2.0 automático"
              value={questionnaire.vehicleYearModel}
              onChange={handleQuestionnaireTextChange('vehicleYearModel')}
            />

            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Ajuda rápida: qual destas opções parece com sua chave?
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                  gap: 1,
                }}
              >
                {keyTypeVisualHints.map((hint) => {
                  const selected = questionnaire.keyProfile === hint.value;

                  return (
                    <Paper
                      key={hint.value}
                      onClick={() => handleVisualKeyTypeSelect(hint.value)}
                      role="button"
                      elevation={selected ? 3 : 1}
                      sx={{
                        p: 1.5,
                        cursor: 'pointer',
                        border: '1px solid',
                        borderColor: selected ? 'primary.main' : 'divider',
                        backgroundColor: selected ? 'action.selected' : 'background.paper',
                      }}
                    >
                      <Box
                        component="img"
                        src={hint.image}
                        alt={hint.title}
                        sx={{
                          width: '100%',
                          maxWidth: 120,
                          height: 64,
                          objectFit: 'contain',
                          display: 'block',
                          mx: 'auto',
                          mb: 1,
                        }}
                      />
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                        {hint.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {hint.description}
                      </Typography>
                    </Paper>
                  );
                })}
              </Box>
            </Box>

            <FormControl fullWidth>
              <InputLabel>Tipo de chave atual</InputLabel>
              <Select
                value={questionnaire.keyProfile}
                label="Tipo de chave atual"
                onChange={handleQuestionnaireSelectChange('keyProfile')}
              >
                <MenuItem value="">Prefiro informar no atendimento</MenuItem>
                <MenuItem value="Chave simples (sem telecomando)">Chave simples (sem telecomando)</MenuItem>
                <MenuItem value="Chave com telecomando canivete">Chave com telecomando canivete</MenuItem>
                <MenuItem value="Chave presencial (de presença)">Chave presencial (de presença)</MenuItem>
                <MenuItem value="Chave com telecomando não canivete (fura bolso)">Chave com telecomando não canivete (fura bolso)</MenuItem>
                <MenuItem value="Telecomando separado da chave (tipo chaveiro)">Telecomando separado da chave (tipo chaveiro)</MenuItem>
                <MenuItem value="Não sei informar">Não sei informar</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Alarme original de fábrica</InputLabel>
              <Select
                value={questionnaire.alarmOriginal}
                label="Alarme original de fábrica"
                onChange={handleQuestionnaireSelectChange('alarmOriginal')}
              >
                <MenuItem value="">Prefiro informar no atendimento</MenuItem>
                <MenuItem value="Sim">Sim</MenuItem>
                <MenuItem value="Não">Não</MenuItem>
                <MenuItem value="Não sei informar">Não sei informar</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              multiline
              minRows={3}
              label="Observações (opcional)"
              placeholder="Ex.: posso enviar foto da chave atual"
              value={questionnaire.notes}
              onChange={handleQuestionnaireTextChange('notes')}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseQuestionnaire} variant="text">Cancelar</Button>
          <Button onClick={handleSendToWhatsApp} variant="contained" color="success" startIcon={<WhatsAppIcon />}>
            Enviar para WhatsApp
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Catalog;
