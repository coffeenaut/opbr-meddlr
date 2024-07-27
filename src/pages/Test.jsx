import Card from '../components/Card'
import Carousel from '../components/Carousel'
import Table from '../components/Table'
import Form from '../components/Form'
import formData from '../data/forms.json'
const Test = () => {
    const imageUrl = new URL('/src/assets/img/dough.jpg', import.meta.url)
    const cards = [
        <Card>
            <img src={imageUrl} />
            <div className='flex justify-center content'>Bread1</div>
        </Card>,
        <Card>
            <img src={imageUrl} />
            <div className='flex justify-center content'>Bread2</div>
        </Card>,
        <Card>
            <img src={imageUrl} />
            <div className='flex justify-center content'>Bread3</div>
        </Card>
    ]
    const tableFields = ["name", "age", "sex"]
    const people = [
        {
            name: "Kobe",
            age: "32",
            sex: "male"
        },
        {
            name: "MJ",
            age: "35",
            sex: "male"
        },
        {
            name: "Allen",
            age: "33",
            sex: "male"
        },
        {
            name: "Shawty",
            age: "22",
            sex: "female"
        },
        {
            name: "Emma",
            age: "18",
            sex: "female",
            net: "120k"
        },{
            name: "Chuck",
            age: "32",
            sex: "yes",
            Height: "6'2"
        }
    ]
    const goToForm = (e) => {
        console.log(e.target.id)
    }
    return (
        <>
            <div className='flex flex-row justify-evenly'>
                <div className="w-1/4">
                    <Card>
                        <img src={imageUrl} />
                        <div className='flex justify-center content'>Bread</div>
                    </Card>
                </div>
                <div className="w-1/4">
                    <Card>
                        <img src={imageUrl} />
                        <div className='flex justify-center content'>Bread</div>
                    </Card>
                </div>
                <div className="w-1/4">
                    <Card>
                        <img src={imageUrl} />
                        <div className='flex justify-center content'>Bread</div>
                    </Card>
                </div>
            </div>
            <div className="flex w-7/8">
                <Carousel cards={cards} />
            </div>
            <div className="flex w-full">
                <Table items={people} fields={tableFields} useActions={true} EditItem={goToForm}>
                </Table>
            </div>
            <div className='flex'>
                <Form fields={formData[0].fields} />
            </div>
            <div class="button-primary">Penis</div>
        </>
        );
  }
  
export default Test;
  