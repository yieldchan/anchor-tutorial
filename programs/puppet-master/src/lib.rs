use anchor_lang::prelude::*;

use anchor_tutorial::cpi::accounts::SetData;
use anchor_tutorial::program::AnchorTutorial;
use anchor_tutorial::{self, Data};

declare_id!("GvztYPREBKYs24UgDrDwL5Cqx9THmUabJvCAM12fa6Aq");

#[program]
#[deny(unused_must_use)]
mod puppet_master {
    use super::*;
    pub fn pull_strings(ctx: Context<PullStrings>, data: u64) -> ProgramResult {
        let cpi_program = ctx.accounts.anchor_tutorial_program.to_account_info();
        let cpi_accounts = SetData {
            puppet: ctx.accounts.puppet.to_account_info(),
        };
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);

        anchor_tutorial::cpi::set_data(cpi_ctx, data)
    }
}

#[derive(Accounts)]
pub struct PullStrings<'info> {
    #[account(mut)]
    pub puppet: Account<'info, Data>,
    pub anchor_tutorial_program: Program<'info, AnchorTutorial>,
}
