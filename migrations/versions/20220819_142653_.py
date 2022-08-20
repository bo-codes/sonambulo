"""empty message

Revision ID: 50e8460ae8d8
Revises: 7cce4b731ba5
Create Date: 2022-08-19 14:26:53.737051

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '50e8460ae8d8'
down_revision = '7cce4b731ba5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('likes', sa.Column('id', sa.Integer(), nullable=False))
    op.alter_column('likes', 'user_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('likes', 'post_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.drop_constraint('likes_post_id_fkey', 'likes', type_='foreignkey')
    op.drop_constraint('likes_user_id_fkey', 'likes', type_='foreignkey')
    op.create_foreign_key(None, 'likes', 'posts', ['post_id'], ['id'], ondelete='CASCADE')
    op.create_foreign_key(None, 'likes', 'users', ['user_id'], ['id'], ondelete='CASCADE')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'likes', type_='foreignkey')
    op.drop_constraint(None, 'likes', type_='foreignkey')
    op.create_foreign_key('likes_user_id_fkey', 'likes', 'users', ['user_id'], ['id'])
    op.create_foreign_key('likes_post_id_fkey', 'likes', 'posts', ['post_id'], ['id'])
    op.alter_column('likes', 'post_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.alter_column('likes', 'user_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.drop_column('likes', 'id')
    # ### end Alembic commands ###
