import useAppSelector from '../../hooks/useAppSelector';
import Scaffold from '../../components/commons/Scaffold';
import TimeCard from '../../components/commons/TimeCard';
import ReadedCard from '../../components/commons/ReadedCard';

function StatsScreen() {
    const time: number =
        ((useAppSelector(store => store.bookshelf.bookshelf)
            .map(b => b.currentPage)
            .reduce((a, b) => a + b, 0) *
            450) /
            250) *
        60000;

    return (
        <Scaffold>
            <TimeCard time={time} />
            <ReadedCard value={199} />
        </Scaffold>
    );
}

export default StatsScreen;
