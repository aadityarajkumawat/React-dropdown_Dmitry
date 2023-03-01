import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { FormDropdown } from '../components/FormDropdown'

const Home: NextPage = () => {
    return (
        <div className='px-10 py-10'>
            <FormDropdown
                className='max-w-[400px] m-auto'
                search={true}
                label="Salary Period"
                id="about"
                items={[
                    {
                        name: 'Hourly',
                        value: 'hourly',
                    },
                    {
                        name: 'Weekly',
                        value: 'weekly',
                    },
                ]}
                value={{
                    name: 'Weekly',
                    value: 'weekly',
                }}
                disabled={false}
                onChange={() => { }}
            />
        </div>
    )
}

export default Home