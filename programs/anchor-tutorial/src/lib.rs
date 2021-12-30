use anchor_lang::prelude::*;

declare_id!("7JLSWQPXYAGxxwqsnYvSLuw4xmVBFjHwK1BU4iRNBLjK");

#[program]
#[deny(unused_must_use)]
pub mod anchor_tutorial {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
