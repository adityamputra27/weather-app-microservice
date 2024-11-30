import { LocationItem, reorderLocations } from "@/store/weatherSlice";
import { RootState } from "@/store";
import React, { useEffect, useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";

export const RecentLocations: React.FC = () => {
  const dispatch = useDispatch();
  const locations = useSelector((state: RootState) => state.weather.recentLocations);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    }
  }, []);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(locations)
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    dispatch(reorderLocations(items));
  }

  if (!mounted) {
    return (
      <div className="space-y-2">
        {locations.map((location: LocationItem) => (
          <div key={location.id} className="bg-gray-100 p-2 rounded-md shadow-md">
            {location.name}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId={"locations"} type="group">
          {(provided) => (
            <div 
              {...provided.droppableProps} 
              ref={provided.innerRef}
              className="space-y-2"
            >
              {locations.map((location: LocationItem, index: number) => (
                <Draggable 
                  key={location.id} 
                  draggableId={location.id} 
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`bg-white/80 backdrop-blur-sm p-4 rounded-lg border 
                        border-gray-200/50 shadow-lg hover:shadow-xl 
                        transition-all duration-300 
                        ${snapshot.isDragging ? 'scale-105 rotate-1 shadow-2xl' : ''} 
                        cursor-grab active:cursor-grabbing 
                        flex items-center justify-between
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-gray-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                          </svg>
                        </div>
                        <span className="font-medium text-gray-700">
                          <span className="text-lg font-semibold">
                            {location.name}
                          </span>
                          <br />
                          <span className="text-sm text-gray-500">
                            {location.id} | {location.lat}, {location.lon}
                          </span>
                        </span>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}