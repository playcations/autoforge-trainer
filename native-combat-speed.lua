-- Inserted before return M in the inspected core_battle_factory module.
-- Repeat normal updates so the battle's fixed-step cap is respected. The native
-- update retains damage, skills, the battle countdown, and result callbacks.
local trainer_update = M.update
function M:update(dt)
    local speed = tonumber(html5.run("__afNative.speed"))
    if speed ~= 2 and speed ~= 3 and speed ~= 5 then speed = 1 end
    for i = 1, speed do
        trainer_update(self, dt)
        if self.paused or battle_global.paused then break end
    end
end
