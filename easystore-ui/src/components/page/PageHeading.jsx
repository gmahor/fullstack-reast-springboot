import { PageTitle } from './PageTitle';

export const PageHeading = (props) => {
    return (
        <div className='text-center max-w-[576px] mx-auto px-4 py-6'>
            <PageTitle title={props.title}/>
            <p className='font-primary leading-6 text-gray-600'>
                {props.children}
            </p>
        </div>

    )
}