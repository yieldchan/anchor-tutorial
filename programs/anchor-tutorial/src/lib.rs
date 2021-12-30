use anchor_lang::prelude::*;

declare_id!("7JLSWQPXYAGxxwqsnYvSLuw4xmVBFjHwK1BU4iRNBLjK");

#[program]
#[deny(unused_must_use)]
pub mod anchor_tutorial {
    use super::*;

    pub fn initialize(_ctx: Context<Initialize>) -> ProgramResult {
        Ok(())
    }

    pub fn set_data(ctx: Context<SetData>, data: u64) -> ProgramResult {
        let puppet = &mut ctx.accounts.puppet;
        puppet.data = data;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 8)]
    pub puppet: Account<'info, Data>,

    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct SetData<'info> {
    #[account(mut)]
    pub puppet: Account<'info, Data>,
}

#[account]
pub struct Data {
    pub data: u64,
}
