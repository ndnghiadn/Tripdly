import Avatar from '@mui/material/Avatar';
const Ava = ({imageUrl}:{imageUrl:string}) => {
    return ( 
        <div className='relative'>
            <div className="absolute bottom-3 rounded-full flex items-center justify-center">
                <Avatar alt="Remy Sharp" src={imageUrl} sx={{ width: 30, height: 30 }} />
            </div>
        </div>
     );
}
 
export default Ava;