import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { QuantityControlProps } from '@/types';
import { Plus, Minus } from 'lucide-react';

export default function QuantityControl({ 
  quantity, 
  onQuantityChange,
  size = 'sm'
}: QuantityControlProps): React.ReactElement {
  const isSm = size === 'sm';
  
  return (
    <div className='flex items-center'>
      <Button
        variant='outline'
        size='icon'
        onClick={() => onQuantityChange(quantity - 1)}
        disabled={quantity <= 1}
        type='button'
        className={isSm ? 'h-8 w-8' : ''}
      >
        <Minus size={isSm ? 14 : 16} />
      </Button>
      <Input
        type='number'
        value={quantity}
        min={1}
        max={99}
        onChange={(e) => onQuantityChange(parseInt(e.target.value, 10) || 1)}
        className={`mx-2 ${isSm ? 'w-[50px] h-8 p-1' : 'w-[60px]'} text-center`}
      />
      <Button
        variant='outline'
        size='icon'
        onClick={() => onQuantityChange(quantity + 1)}
        disabled={quantity >= 99}
        type='button'
        className={isSm ? 'h-8 w-8' : ''}
      >
        <Plus size={isSm ? 14 : 16} />
      </Button>
    </div>
  );
}