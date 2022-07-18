import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = (props) => (
  <ContentLoader
    className='pizza-block'
    speed={2}
    width={280}
    height={500}
    viewBox='0 0 280 500'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
    {...props}
  >
    <circle cx='139' cy='120' r='120' />
    <rect x='0' y='266' rx='5' ry='5' width='280' height='27' />
    <rect x='0' y='313' rx='5' ry='5' width='280' height='88' />
    <rect x='126' y='423' rx='20' ry='20' width='152' height='45' />
    <rect x='0' y='431' rx='5' ry='5' width='100' height='30' />
  </ContentLoader>
);

export default Skeleton;
