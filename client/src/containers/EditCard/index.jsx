import React, { Component } from 'react';
import {
  Container,
  Paper,
  Typography,
  withStyles,
  Divider,
  Grid,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import styles from './styles';
import CardItem from '@/components/CardItem';
import { getCardById, updateData, deleteCard } from './actions';
import withTitle from '@/components/withTitle';

class EditCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      image: '',
      date: '',
      imageFile: null,
      newImage: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.getCardById(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.card) {
      const { card } = nextProps;
      this.setState({
        title: card.title,
        description: card.description,
        image: card.image,
        date: card.date,
      });
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleImageChange(e) {
    this.setState({ imageFile: e.target.files[0] });
    const reader = new FileReader();
    reader.onload = event => this.setState({ newImage: event.target.result });
    reader.readAsDataURL(e.target.files[0]);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { history, match } = this.props;

    console.log(this.state);

    this.props.updateData(match.params.id, this.state, history);
  }

  handleDelete = id => e => {
    e.preventDefault();
    const { history, match } = this.props;

    if (window.confirm('Deseja deletar este card?')) {
      this.props.deleteCard(match.params.id, history);
    }
  };

  render() {
    const { classes, user, getCardError, errors, getCardLoading, editCardLoading } = this.props;

    if (getCardError) {
      return (
        <Container>
          <Paper className={classes.root}>
            <Typography component="h4" variant="h4" align="center" className="mt-3 mb-3">
              Erro ao buscar Card no banco de dados:{' '}
              <Typography component="h5" variant="h5">
                {getCardError.id}
              </Typography>
            </Typography>
          </Paper>
        </Container>
      );
    }
    return (
      <Container>
        <Paper className={classes.root}>
          <Typography component="h4" variant="h3" align="center" className="mt-3 mb-3">
            Editar Card
          </Typography>

          <Divider className={classes.divider} />

          {getCardLoading === true ? (
            <Grid container direction="row" justify="center" className="mt-3">
              <CircularProgress className={classes.spinner} />
            </Grid>
          ) : (
            <Grid container>
              <Grid sm={12} sm={6} item>
                <Typography component="h4" variant="h5" align="center" className="mt-3 mb-3">
                  Alterar Dados
                </Typography>

                <Grid xs={12} sm={8} item className={classes.formContainer}>
                  <FormControl fullWidth error={Boolean(errors.title)}>
                    <InputLabel>Título</InputLabel>
                    <Input onChange={this.handleChange} value={this.state.title} name="title" />
                    <FormHelperText>
                      {Boolean(errors.title) === true ? errors.title : 'E.g: Awesome Card'}
                    </FormHelperText>
                  </FormControl>

                  <FormControl fullWidth error={Boolean(errors.description)}>
                    <InputLabel>Descrição</InputLabel>
                    <Input
                      onChange={this.handleChange}
                      value={this.state.description}
                      name="description"
                      multiline
                    />
                    <FormHelperText>
                      {Boolean(errors.description) === true
                        ? errors.description
                        : 'E.g: Awesome Description here'}
                    </FormHelperText>
                  </FormControl>

                  <FormControl fullWidth error={Boolean(errors.image)}>
                    <InputLabel>Imagem</InputLabel>
                    <Input onChange={this.handleImageChange} name="image" type="file" />
                    <FormHelperText>
                      {Boolean(errors.image) === true ? errors.image : 'Selecione a imagem do card'}
                    </FormHelperText>
                  </FormControl>

                  <Button
                    onClick={this.handleSubmit}
                    color="secondary"
                    variant="contained"
                    className="mt-3"
                    fullWidth
                  >
                    {editCardLoading === true ? (
                      <Grid container direction="row" justify="center">
                        <Typography>Confirmar</Typography>
                        <CircularProgress size={25} className="ml-2" color="inherit" />
                      </Grid>
                    ) : (
                      <Typography>Confirmar</Typography>
                    )}
                  </Button>
                </Grid>
              </Grid>

              <Grid xs={12} sm={6} item>
                <Typography component="h4" variant="h5" align="center" className="mt-3 mb-3">
                  Live preview
                </Typography>

                <Grid item xs={12} sm={8} className={classes.cardContainer}>
                  <CardItem
                    edit
                    data={this.state}
                    user={user}
                    image={this.state.newImage}
                    handleDelete={this.handleDelete}
                  />
                </Grid>
              </Grid>
            </Grid>
          )}
        </Paper>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state.Login;
  const { card, getCardError, errors, getCardLoading, editCardLoading } = state.EditCard;

  return {
    user,
    card,
    getCardError,
    errors,
    getCardLoading,
    editCardLoading,
  };
};

const mapDispatchToProps = {
  getCardById,
  updateData,
  deleteCard,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  withStyles(styles, { withTheme: true })(withTitle({ component: EditCard, title: 'Editar card' })),
);
