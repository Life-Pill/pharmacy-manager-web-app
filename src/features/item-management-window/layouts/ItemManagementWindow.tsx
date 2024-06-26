import { useEffect, useState } from 'react';
import useItemService from '../services/ItemManagementServices';
import { BsBoxSeam, BsBoxes, BsExclamationTriangle } from 'react-icons/bs';
import { TbCirclePlus } from 'react-icons/tb';
import useOrderManagementService from '../../order-management-window/services/OrderManagementServices';
import { BiLoader } from 'react-icons/bi';
type Props = {};

function ItemManagementWindow({}: Props) {
  const { fetchAllItems, items, filteredItems, setFilteredItems, loading } =
    useItemService();
  const { fetchAllBranches, branches } = useOrderManagementService();

  const [selectedBranch, setSelectedBranch] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSearch = (searchName: string) => {
    const filtered = items.filter((medicine) =>
      medicine.itemName.toLowerCase().includes(searchName.toLowerCase())
    );
    setFilteredItems(filtered);
  };
  useEffect(() => {
    fetchAllItems();
    fetchAllBranches();
  }, []);

  // Calculate summary information
  const totalItems = items.length;
  const inStockItems = items.reduce(
    (acc, item) => acc + (item.itemQuantity > 0 ? 1 : 0),
    0
  );
  const outOfStockItems = items.reduce(
    (acc, item) => acc + (item.itemQuantity === 0 ? 1 : 0),
    0
  );
  const averagePrice = (
    items.reduce((acc, item) => acc + item.sellingPrice, 0) / totalItems
  ).toFixed(2);

  useEffect(() => {
    const filter = filteredItems?.filter((item) => {
      if (selectedBranch === '' || selectedBranch === undefined) return true;
      return item.branchId?.toString() === selectedBranch;
    });

    const sortedItems = [...filter].sort((a, b) => {
      const dateA = new Date(a.expireDate).getTime();
      const dateB = new Date(b.expireDate).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    setFilteredItems(sortedItems);
  }, [selectedBranch, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div
      className='flex flex-col max-h-screen overflow-y-scroll'
      data-testid='items-management-window'
    >
      {/* buttons */}

      {/* Summary Cards */}
      <div className='flex flex-row items-center z-20 p-8 px-16 justify-around bg-slate-200 rounded-lg'>
        {loading ? (
          <BiLoader className='animate-spin text-4xl text-blue-500' />
        ) : (
          <div className='flex flex-row items-center z-20 p-2 px-16 justify-around bg-slate-200 rounded-lg space-x-12'>
            <div className='summary-card bg-yellow-300 p-8 rounded-lg flex flex-col items-center'>
              <BsBoxSeam size={25} />
              <h1 className='font-medium'>Total Items</h1>
              <h2 className='text-xl font-bold'>{totalItems}</h2>
            </div>
            <div className='summary-card bg-green-300 p-8 rounded-lg flex flex-col items-center'>
              <BsBoxes size={25} />
              <h1 className='font-medium'>In Stock</h1>
              <h2 className='text-xl font-bold'>{inStockItems}</h2>
            </div>
            <div className='summary-card bg-orange-500 p-8 rounded-lg flex flex-col items-center'>
              <BsExclamationTriangle size={25} />
              <h1 className='font-medium'>Out of Stock</h1>
              <h2 className='text-xl font-bold'>{outOfStockItems}</h2>
            </div>
            <div className='summary-card bg-purple-300 p-8 rounded-lg flex flex-col items-center'>
              <TbCirclePlus size={25} />
              <h1 className='font-medium'>Average Price</h1>
              <h2 className='text-xl font-bold'>${averagePrice}</h2>
            </div>
          </div>
        )}
      </div>

      {/* table */}
      <div className='flex items-center justify-between mt-4 p-2'>
        <p className='font-bold text-xl '>Medicine Details</p>
        <div className='flex items-center'>
          <label htmlFor='branch' className='mb-1'>
            Branch:
          </label>

          <select
            id='branch'
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className='border rounded p-1 w-auto px-2'
          >
            <option value=''>All</option>
            {branches?.map((branch) => (
              <option value={branch.branchId}>{branch.branchName}</option>
            ))}
          </select>
        </div>
        <input
          type='text'
          placeholder='Search by name'
          className='px-4 py-2 border rounded-md outline-none'
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className='overflow-y-auto max-h-[500px]'>
        <div className='relative'>
          {loading ? (
            <BiLoader className='animate-spin text-4xl text-blue-500' />
          ) : (
            <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
              <thead className='text-xs uppercase bg-slate-300 sticky top-0'>
                <tr>
                  <th scope='col' className='px-6 py-3'>
                    Medicine ID
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Name
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Description
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Price
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Status
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Quantity
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 cursor-pointer'
                    onClick={toggleSortOrder}
                  >
                    Expire On
                    {sortOrder === 'asc' ? '↑' : '↓'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((medicine) => (
                  <tr className='bg-slate-50 border-b'>
                    <td className='px-6 py-4'>{medicine.itemId}</td>
                    <td className='px-6 py-4'>{medicine.itemName}</td>
                    <td className='px-6 py-4'>{medicine.itemDescription}</td>
                    <td className='px-6 py-4'>{medicine.sellingPrice}</td>
                    <td className='px-6 py-4'>
                      {
                        <div
                          className={`rounded-full p-1 w-24 flex items-center justify-center ${
                            medicine.itemQuantity > 0
                              ? 'bg-green-500'
                              : 'bg-yellow-500'
                          }`}
                        >
                          <span
                            className={`${
                              medicine.itemQuantity > 0
                                ? 'text-white'
                                : 'text-black'
                            }`}
                          >
                            {medicine.itemQuantity > 0
                              ? 'In stock'
                              : 'Out of stock'}
                          </span>
                        </div>
                      }
                    </td>
                    <td className='px-6 py-4'>
                      {
                        <div
                          className={`rounded-full p-1 w-24 flex items-center justify-center ${
                            medicine.itemQuantity > 0
                              ? 'bg-green-500'
                              : 'bg-yellow-500'
                          }`}
                        >
                          <span
                            className={`${
                              medicine.itemQuantity > 0
                                ? 'text-white'
                                : 'text-black'
                            }`}
                          >
                            {medicine.itemQuantity}
                          </span>
                        </div>
                      }
                    </td>
                    <td
                      className={`px-6 py-4 ${
                        new Date(medicine.expireDate) < new Date()
                          ? 'text-red-500'
                          : ''
                      }`}
                    >
                      {medicine.expireDate?.split('T')[0]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemManagementWindow;
