import {Suspense} from 'react'
import Spinner from '../components/Spinner'
import ChanceCalculator from '../components/ChanceCalculator';
import Card from '../components/Card';

const Chance = () => {
    return (
        <>
        <Suspense fallback={Spinner}>
        <div className='flex justify-evenly'>
            <div className='cutTop'>
                <Card>
                    <ChanceCalculator />
                </Card>
            </div>
        </div>
        </Suspense>
    </>
     )
}
export default Chance