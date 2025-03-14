import useCartStore from '@/lib/store/cart-store';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { RemoveItemDialogProps } from '@/types';

export default function RemoveItemDialog({
  itemId,
  isIcon = false
}: RemoveItemDialogProps): React.ReactElement {
  const { removeItem } = useCartStore();
  
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {isIcon ? (
          <Button
            variant='ghost'
            size='icon'
            type='button'
          >
            <Trash2 size={16} />
          </Button>
        ) : (
          <Button
            variant='outline'
            size='sm'
            className='text-red-500 border-red-200'
          >
            <Trash2
              size={14}
              className='mr-1'
            />{' '}
            Remove
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the item from your cart.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => removeItem(itemId)}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}