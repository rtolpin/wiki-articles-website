import { render, fireEvent } from '@testing-library/react';
import App from './App';
import NumResultSelect from './NumSelect';
import DateSelector from './DateSelector';
import ContainerGrid from './ContainerInfo';
import ArticleDetailView from './ArticleDetailView';

test('sets default number of results selection', () => {
  const { container } = render(<NumResultSelect articles={[{'article': 'example', 'rank': '1', 'views': '100'}, {'article': 'example_two', 'rank': '2', 'views': '200'}]}/>);
  const selectNumResults = container.querySelector('.form-select');
  expect(selectNumResults).toBeInTheDocument();
  expect(selectNumResults.value).toBe('100');
});

test('changes number of results selection', () => {
  const { container } = render(<NumResultSelect articles={[{'article': 'example', 'rank': '1', 'views': '100'}, {'article': 'example_two', 'rank': '2', 'views': '200'}]}/>);
  const numSelection = container.querySelector('.form-select');
  fireEvent.change(numSelection, {target: {value: '200'}});
  expect(numSelection).toBeInTheDocument();
  expect(numSelection.value).toBe('200');
});

test('renders Date Selection Component', () => {
  const {container} = render(<DateSelector title={'Start Date:'} yesterday={new Date()} fetchData={(date) => {}} formatDate={(date, delim) => {}}/>);
  const dateSelector = container.querySelector('#date-selector');
  fireEvent.change(dateSelector, {target: {value: '2022-09-09'}});
  expect(dateSelector).toBeInTheDocument();
  expect(dateSelector.value).toBe('2022-09-09');
});

test('renders App Component', () => {
  render(<App/>);
});

test('renders Results Selection Component', () => {
  render(<NumResultSelect articles={[{'article': 'example', 'rank': '1', 'views': '100'}, {'article': 'example_two', 'rank': '2', 'views': '200'}]}/>);
});

test('renders Date Selection Component', () => {
  render(<DateSelector title={'Start Date:'} yesterday={new Date()} fetchData={(date) => {}} formatDate={(date, delim) => {}}/>);
});

test('renders Container Grid Component', () => {
  const {container} = render(<ContainerGrid numRows={100} articles={[{'article': 'example', 'rank': '1', 'views': '100'}, {'article': 'example_two', 'rank': '2', 'views': '200'}]} className='container-center'/>);
  const grid = container.querySelector('.container-fluid');
  expect(grid).toBeInTheDocument();
});

test('renders Article Detail View Component', () => {
  const {container} = render(<ArticleDetailView article='Queen_Victoria'/>);
  const details = container.querySelector('div');
  expect(details).toBeInTheDocument();
});