SELECT 
   u.userid ,
   u.username ,
   mp.planid ,
   mp.planname ,
   mp.startdate ,
   mp.enddate ,
   gl.listid ,
   gl.listname ,
   gl.date AS grocerylistdate ,
   r.recipeid ,
   r.recipename ,
   i.ingredientid ,
   i.ingredientname ,
   r.instructions 
FROM 
   Users u 
JOIN MealPlan mp ON u.userid = mp.userid 
JOIN GroceryList gl ON mp.planid = gl.planid 
JOIN Contained ct ON mp.planid = ct.planid 
JOIN Recipe r ON ct.recipeid = r.recipeid 
JOIN MadeOf mo ON r.recipeid = mo.recipeid 
JOIN Ingredient i ON mo.ingredientid = i.ingredientid ;